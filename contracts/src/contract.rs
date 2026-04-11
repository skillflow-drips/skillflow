use soroban_sdk::{contract, contractimpl, token, Address, Env, Vec};
use crate::errors::ContractError;
use crate::storage::{
    get_treasury, get_commission_bps, get_job, set_job, get_milestone, set_milestone,
    get_job_counter, increment_job_counter, is_initialized, set_initialized,
    set_treasury, set_commission_bps,
};
use crate::types::{Job, Milestone, JobStatus, MilestoneStatus};

#[contract]
pub struct SkillFlowContract;

#[contractimpl]
impl SkillFlowContract {
    /// Sets treasury address and commission rate. Callable once only.
    pub fn initialize(
        env: Env,
        treasury: Address,
        commission_bps: u32,
    ) -> Result<(), ContractError> {
        if is_initialized(&env) {
            return Err(ContractError::InvalidStatus);
        }
        set_treasury(&env, &treasury);
        set_commission_bps(&env, commission_bps);
        set_initialized(&env);
        Ok(())
    }

    /// Transfers USDC from client to contract and stores the job on-chain.
    /// Returns the auto-incremented on-chain job_id (u64).
    pub fn fund_escrow(
        env: Env,
        client: Address,
        freelancer: Address,
        usdc_token: Address,
        total_amount: i128,
        milestone_amounts: Vec<i128>,
    ) -> Result<u64, ContractError> {
        client.require_auth();

        // Validate milestone amounts sum to total
        let sum: i128 = milestone_amounts.iter().fold(0i128, |acc, a| acc + a);
        if sum != total_amount {
            return Err(ContractError::BudgetMismatch);
        }

        // Pull USDC from client into the contract
        let token_client = token::Client::new(&env, &usdc_token);
        token_client.transfer(&client, &env.current_contract_address(), &total_amount);

        // Assign job ID and store
        let job_id = increment_job_counter(&env);
        let job = Job {
            id: job_id,
            client: client.clone(),
            freelancer: freelancer.clone(),
            budget: total_amount,
            status: JobStatus::Funded,
            milestones: milestone_amounts.clone(),
        };
        set_job(&env, job_id, &job);

        // Store individual milestones
        for (idx, amount) in milestone_amounts.iter().enumerate() {
            let m = Milestone { amount, status: MilestoneStatus::Pending };
            set_milestone(&env, job_id, idx as u32, &m);
        }

        Ok(job_id)
    }

    /// Releases 95% of milestone amount to freelancer and 5% to treasury.
    pub fn approve_milestone(
        env: Env,
        client: Address,
        job_id: u64,
        milestone_id: u32,
        usdc_token: Address,
    ) -> Result<(), ContractError> {
        client.require_auth();

        let job = get_job(&env, job_id).ok_or(ContractError::JobNotFound)?;
        if job.client != client {
            return Err(ContractError::NotAuthorized);
        }

        let mut milestone = get_milestone(&env, job_id, milestone_id)
            .ok_or(ContractError::JobNotFound)?;
        if milestone.status != MilestoneStatus::Pending {
            return Err(ContractError::MilestoneNotPending);
        }

        let commission_bps = get_commission_bps(&env) as i128;
        let treasury = get_treasury(&env);

        let fee = milestone.amount * commission_bps / 10_000;
        let payout = milestone.amount - fee;

        let token_client = token::Client::new(&env, &usdc_token);
        token_client.transfer(&env.current_contract_address(), &job.freelancer, &payout);
        token_client.transfer(&env.current_contract_address(), &treasury, &fee);

        milestone.status = MilestoneStatus::Approved;
        set_milestone(&env, job_id, milestone_id, &milestone);

        Ok(())
    }

    /// Locks a milestone in DISPUTED state.
    pub fn raise_dispute(
        env: Env,
        caller: Address,
        job_id: u64,
        milestone_id: u32,
    ) -> Result<(), ContractError> {
        caller.require_auth();

        let job = get_job(&env, job_id).ok_or(ContractError::JobNotFound)?;
        if job.client != caller && job.freelancer != caller {
            return Err(ContractError::NotAuthorized);
        }

        let mut milestone = get_milestone(&env, job_id, milestone_id)
            .ok_or(ContractError::JobNotFound)?;
        if milestone.status != MilestoneStatus::Pending {
            return Err(ContractError::MilestoneNotPending);
        }

        milestone.status = MilestoneStatus::Disputed;
        set_milestone(&env, job_id, milestone_id, &milestone);

        Ok(())
    }

    /// Splits escrowed milestone USDC according to arbitrator ruling (bps to client).
    pub fn resolve_dispute(
        env: Env,
        arbitrator: Address,
        job_id: u64,
        milestone_id: u32,
        client_bps: u32,      // portion to client (e.g. 5000 = 50%)
        usdc_token: Address,
    ) -> Result<(), ContractError> {
        arbitrator.require_auth();

        let treasury = get_treasury(&env);
        if arbitrator != treasury {
            return Err(ContractError::NotAuthorized);
        }

        let job = get_job(&env, job_id).ok_or(ContractError::JobNotFound)?;
        let mut milestone = get_milestone(&env, job_id, milestone_id)
            .ok_or(ContractError::JobNotFound)?;

        if milestone.status != MilestoneStatus::Disputed {
            return Err(ContractError::InvalidStatus);
        }

        let client_share = milestone.amount * client_bps as i128 / 10_000;
        let freelancer_share = milestone.amount - client_share;

        let token_client = token::Client::new(&env, &usdc_token);
        if client_share > 0 {
            token_client.transfer(&env.current_contract_address(), &job.client, &client_share);
        }
        if freelancer_share > 0 {
            token_client.transfer(&env.current_contract_address(), &job.freelancer, &freelancer_share);
        }

        milestone.status = MilestoneStatus::Approved;
        set_milestone(&env, job_id, milestone_id, &milestone);

        Ok(())
    }

    /// Refunds all escrowed USDC back to the client.
    pub fn cancel_job(
        env: Env,
        client: Address,
        job_id: u64,
        usdc_token: Address,
    ) -> Result<(), ContractError> {
        client.require_auth();

        let mut job = get_job(&env, job_id).ok_or(ContractError::JobNotFound)?;
        if job.client != client {
            return Err(ContractError::NotAuthorized);
        }
        if job.status != JobStatus::Funded {
            return Err(ContractError::InvalidStatus);
        }

        let token_client = token::Client::new(&env, &usdc_token);
        token_client.transfer(&env.current_contract_address(), &client, &job.budget);

        job.status = JobStatus::Completed; // mark closed to prevent double-refund
        set_job(&env, job_id, &job);

        Ok(())
    }
}
