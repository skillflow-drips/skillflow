use soroban_sdk::{symbol_short, Env, Symbol};
use crate::types::Job;

const JOB_KEY: Symbol = symbol_short!("JOB");

pub fn get_job(env: &Env, id: u64) -> Option<Job> {
    env.storage().persistent().get(&id)
}

pub fn set_job(env: &Env, id: u64, job: &Job) {
    env.storage().persistent().set(&id, job);
    // Extend TTL to prevent archival
    env.storage().persistent().extend_ttl(&id, 1000, 5000);
}
