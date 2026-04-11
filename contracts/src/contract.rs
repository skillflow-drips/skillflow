use soroban_sdk::{contractimpl, Address, Env};
use crate::types::{Job, ContractError};

pub struct SkillFlowContract;

#[contractimpl]
impl SkillFlowContract {
    pub fn fund_escrow(env: Env, client: Address, budget: i128) -> Result<(), ContractError> {
        client.require_auth();
        Ok(())
    }
}
