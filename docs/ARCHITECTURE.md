# SkillFlow Architecture

SkillFlow is a monorepo with three independently deployable surfaces:

- `frontend`: Next.js application for clients and freelancers.
- `backend`: NestJS API for authentication, profiles, jobs, applications, token accounting, and off-chain records.
- `contracts`: Soroban smart contract for escrow funding, milestone release, dispute resolution, and cancellation.

## System Boundaries

The platform keeps private keys out of application custody. Users sign authentication challenges and payment transactions from a Stellar wallet.

On-chain responsibilities:

- Escrow funding
- Milestone release
- Platform commission split
- Dispute settlement
- Client refund on cancellation

Off-chain responsibilities:

- User profiles
- Job listings
- Application token balances
- Applications
- Reviews
- Notifications
- IPFS hashes for deliverables and evidence

## Data Flow

1. A user authenticates with SEP-10.
2. A client creates a job and milestone plan in Postgres.
3. A freelancer buys application tokens with a Stellar payment.
4. The backend verifies the token purchase and credits the account.
5. The freelancer applies to an open job.
6. The client funds escrow through a Soroban transaction.
7. Milestone submissions store deliverable hashes off-chain.
8. Approval releases funds through the contract and records the transaction off-chain.

## Maintainer Notes

The API and contract are intentionally separated. Backend state mirrors product workflow, while the contract owns fund movement. Any change that touches payment semantics should include both a backend record migration plan and a contract test plan.
