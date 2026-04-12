use soroban_sdk::{contractevent, Address};

#[contractevent]
pub struct InitializedEvent {
    pub treasury: Address,
    pub commission_bps: u32,
}

#[contractevent]
pub struct EscrowFundedEvent {
    pub job_id: u64,
    pub client: Address,
    pub freelancer: Address,
    pub total_amount: i128,
}

#[contractevent]
pub struct MilestoneApprovedEvent {
    pub job_id: u64,
    pub milestone_id: u32,
    pub freelancer: Address,
    pub payout: i128,
    pub fee: i128,
}

#[contractevent]
pub struct DisputeRaisedEvent {
    pub job_id: u64,
    pub milestone_id: u32,
    pub caller: Address,
}

#[contractevent]
pub struct DisputeResolvedEvent {
    pub job_id: u64,
    pub milestone_id: u32,
    pub client_share: i128,
    pub freelancer_share: i128,
}

#[contractevent]
pub struct JobCancelledEvent {
    pub job_id: u64,
    pub client: Address,
    pub amount: i128,
}
