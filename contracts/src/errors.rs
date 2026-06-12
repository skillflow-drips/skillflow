use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum ContractError {
    NotAuthorized = 1,       // require_auth failed
    JobNotFound = 2,         // Accessing non-existent job ID
    InvalidStatus = 3,       // Action invalid for current state (e.g. approve a non-funded job)
    BudgetMismatch = 4,      // Calculation failure in milestone sums
    MathOverflow = 5,        // i128 boundary violation
    MilestoneNotPending = 6, // Cannot approve a milestone already paid or disputed
}
