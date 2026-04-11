use soroban_sdk::{Address, Env};
use crate::types::{Job, Milestone};

#[derive(Clone)]
#[soroban_sdk::contracttype]
pub enum DataKey {
    Job(u64),
    JobMilestone(u64, u32),  // (job_id, milestone_index)
    Treasury,
    CommissionBps,
    Initialized,
    JobCounter,
}

// --- Treasury & Config ---

pub fn get_treasury(env: &Env) -> Address {
    env.storage().instance().get(&DataKey::Treasury).unwrap()
}

pub fn set_treasury(env: &Env, address: &Address) {
    env.storage().instance().set(&DataKey::Treasury, address);
}

pub fn get_commission_bps(env: &Env) -> u32 {
    env.storage().instance().get(&DataKey::CommissionBps).unwrap_or(500u32)
}

pub fn set_commission_bps(env: &Env, bps: u32) {
    env.storage().instance().set(&DataKey::CommissionBps, &bps);
}

pub fn is_initialized(env: &Env) -> bool {
    env.storage().instance().has(&DataKey::Initialized)
}

pub fn set_initialized(env: &Env) {
    env.storage().instance().set(&DataKey::Initialized, &true);
}

// --- Job Counter ---

pub fn get_job_counter(env: &Env) -> u64 {
    env.storage().instance().get(&DataKey::JobCounter).unwrap_or(0u64)
}

pub fn increment_job_counter(env: &Env) -> u64 {
    let next = get_job_counter(env) + 1;
    env.storage().instance().set(&DataKey::JobCounter, &next);
    next
}

// --- Jobs ---

pub fn get_job(env: &Env, job_id: u64) -> Option<Job> {
    env.storage().persistent().get(&DataKey::Job(job_id))
}

pub fn set_job(env: &Env, job_id: u64, job: &Job) {
    env.storage().persistent().set(&DataKey::Job(job_id), job);
}

// --- Milestones ---

pub fn get_milestone(env: &Env, job_id: u64, milestone_id: u32) -> Option<Milestone> {
    env.storage().persistent().get(&DataKey::JobMilestone(job_id, milestone_id))
}

pub fn set_milestone(env: &Env, job_id: u64, milestone_id: u32, milestone: &Milestone) {
    env.storage().persistent().set(&DataKey::JobMilestone(job_id, milestone_id), milestone);
}
