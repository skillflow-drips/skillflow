use crate::types::{Job, Milestone};
use soroban_sdk::{Address, Env};

#[derive(Clone)]
#[soroban_sdk::contracttype]
pub enum DataKey {
    Job(u64),
    JobMilestone(u64, u32), // (job_id, milestone_index)
    Treasury,
    CommissionBps,
    Initialized,
    JobCounter,
}

// --- TTL Constants ---
const DAY_IN_LEDGERS: u32 = 17280;
const INSTANCE_THRESHOLD: u32 = 7 * DAY_IN_LEDGERS; // 1 week
const INSTANCE_BUMP: u32 = 30 * DAY_IN_LEDGERS; // 30 days
const PERSISTENT_THRESHOLD: u32 = 7 * DAY_IN_LEDGERS;
const PERSISTENT_BUMP: u32 = 30 * DAY_IN_LEDGERS;

// --- Treasury & Config ---

fn extend_instance_ttl(env: &Env) {
    env.storage()
        .instance()
        .extend_ttl(INSTANCE_THRESHOLD, INSTANCE_BUMP);
}

pub fn get_treasury(env: &Env) -> Address {
    extend_instance_ttl(env);
    env.storage().instance().get(&DataKey::Treasury).unwrap()
}

pub fn set_treasury(env: &Env, address: &Address) {
    extend_instance_ttl(env);
    env.storage().instance().set(&DataKey::Treasury, address);
}

pub fn get_commission_bps(env: &Env) -> u32 {
    extend_instance_ttl(env);
    env.storage()
        .instance()
        .get(&DataKey::CommissionBps)
        .unwrap_or(500u32)
}

pub fn set_commission_bps(env: &Env, bps: u32) {
    extend_instance_ttl(env);
    env.storage().instance().set(&DataKey::CommissionBps, &bps);
}

pub fn is_initialized(env: &Env) -> bool {
    env.storage().instance().has(&DataKey::Initialized)
}

pub fn set_initialized(env: &Env) {
    extend_instance_ttl(env);
    env.storage().instance().set(&DataKey::Initialized, &true);
}

// --- Job Counter ---

pub fn get_job_counter(env: &Env) -> u64 {
    extend_instance_ttl(env);
    env.storage()
        .instance()
        .get(&DataKey::JobCounter)
        .unwrap_or(0u64)
}

pub fn increment_job_counter(env: &Env) -> u64 {
    let next = get_job_counter(env) + 1;
    extend_instance_ttl(env);
    env.storage().instance().set(&DataKey::JobCounter, &next);
    next
}

// --- Jobs ---

pub fn get_job(env: &Env, job_id: u64) -> Option<Job> {
    let key = DataKey::Job(job_id);
    env.storage()
        .persistent()
        .extend_ttl(&key, PERSISTENT_THRESHOLD, PERSISTENT_BUMP);
    env.storage().persistent().get(&key)
}

pub fn set_job(env: &Env, job_id: u64, job: &Job) {
    let key = DataKey::Job(job_id);
    env.storage().persistent().set(&key, job);
    env.storage()
        .persistent()
        .extend_ttl(&key, PERSISTENT_THRESHOLD, PERSISTENT_BUMP);
}

// --- Milestones ---

pub fn get_milestone(env: &Env, job_id: u64, milestone_id: u32) -> Option<Milestone> {
    let key = DataKey::JobMilestone(job_id, milestone_id);
    env.storage()
        .persistent()
        .extend_ttl(&key, PERSISTENT_THRESHOLD, PERSISTENT_BUMP);
    env.storage().persistent().get(&key)
}

pub fn set_milestone(env: &Env, job_id: u64, milestone_id: u32, milestone: &Milestone) {
    let key = DataKey::JobMilestone(job_id, milestone_id);
    env.storage().persistent().set(&key, milestone);
    env.storage()
        .persistent()
        .extend_ttl(&key, PERSISTENT_THRESHOLD, PERSISTENT_BUMP);
}
