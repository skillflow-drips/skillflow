# SkillFlow

SkillFlow is a Stellar-native freelance escrow platform for client-funded milestone work. Clients post jobs, lock milestone budgets in USDC, and approve releases from a connected wallet. Freelancers browse funded work, submit deliverables, and receive approved payouts directly to their Stellar wallet.

The repository is organized as a production-style monorepo with separate frontend, backend, and Soroban contract workspaces. It is built to demonstrate maintainable full-stack ownership: clear package boundaries, repeatable local commands, CI coverage for TypeScript and Rust, security-conscious wallet flows, and contributor-facing documentation.

## Contents

- [Product Overview](#product-overview)
- [Role-Based Flow](#role-based-flow)
- [Architecture](#architecture)
- [Monorepo Structure](#monorepo-structure)
- [Tech Stack](#tech-stack)
- [Wallet Integration](#wallet-integration)
- [Smart Contract Scope](#smart-contract-scope)
- [Backend Responsibilities](#backend-responsibilities)
- [Frontend Experience](#frontend-experience)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Verification](#verification)
- [CI](#ci)
- [Repository Hygiene](#repository-hygiene)
- [Maintainer Notes](#maintainer-notes)

## Product Overview

SkillFlow combines a familiar freelance workflow with Stellar settlement:

- Jobs and profiles live off-chain for speed and rich product UX.
- Escrow funding, milestone release, dispute resolution, and refunds are handled by a Soroban contract.
- Users keep custody of private keys and sign actions from their wallet.
- USDC settlement is transparent to both sides of a milestone.
- The platform can charge commission during milestone release instead of adding extra client-side payment steps.

The current UI is dark-mode only and routes users into two different workspaces from the landing page.

## Role-Based Flow

### Client: Job Poster

Clients use SkillFlow to:

- Create jobs with a budget, required skills, and milestone breakdown.
- Review freelancer proposals.
- Fund escrow upfront in USDC on Stellar.
- Review milestone deliverables.
- Approve milestone release transactions from a connected wallet.
- Track funded work, pending approvals, proposals, and escrow state in the client dashboard.

Client path:

```text
Landing page -> I am hiring -> Connect wallet -> /dashboard?role=client
```

### Freelancer: Worker

Freelancers use SkillFlow to:

- Browse funded Stellar jobs.
- Buy and spend application tokens.
- Apply for open work.
- Submit deliverables for milestone review.
- Receive approved USDC payouts directly to their Stellar wallet.
- Track active milestones, applications, token balance, and recent escrow activity in the freelancer dashboard.

Freelancer path:

```text
Landing page -> I am working -> Connect wallet -> /dashboard?role=freelancer
```

## Architecture

SkillFlow separates product state from fund movement.

```text
                       ┌────────────────────────────┐
                       │        Next.js UI          │
                       │ Client + Freelancer flows  │
                       └─────────────┬──────────────┘
                                     │
                                     │ REST / app actions
                                     │
                       ┌─────────────▼──────────────┐
                       │        NestJS API          │
                       │ Auth, jobs, tokens, IPFS   │
                       └───────┬────────────┬───────┘
                               │            │
                               │            │ Stellar SDK / RPC
                               │            │
                 ┌─────────────▼───┐    ┌───▼────────────────┐
                 │   PostgreSQL    │    │  Soroban Contract  │
                 │ Off-chain state │    │  Escrow movement   │
                 └─────────────────┘    └────────────────────┘
```

On-chain responsibilities:

- Escrow funding
- Milestone release
- Platform commission split
- Dispute settlement
- Client refund on cancellation

Off-chain responsibilities:

- User profiles
- Job metadata
- Applications
- Token balances
- Reviews
- Notifications
- IPFS hashes for deliverables and dispute evidence
- Transaction records that mirror on-chain events

## Monorepo Structure

```text
skillflow/
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── applications/
│       ├── auth/
│       ├── audit/
│       ├── ipfs/
│       ├── jobs/
│       ├── milestones/
│       ├── notifications/
│       ├── stellar/
│       ├── tokens/
│       └── users/
├── contracts/
│   ├── Cargo.toml
│   └── src/
│       ├── contract.rs
│       ├── errors.rs
│       ├── events.rs
│       ├── lib.rs
│       ├── storage.rs
│       └── types.rs
├── docs/
│   ├── ARCHITECTURE.md
│   └── MAINTAINER_GUIDE.md
├── frontend/
│   ├── public/
│   │   └── wallets/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── store/
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
├── normal.env
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── vercel.json
```

## Tech Stack

| Area | Stack |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, Zustand |
| Backend | NestJS 11, Prisma 6, PostgreSQL, Stellar SDK |
| Smart contract | Rust 2024, Soroban SDK 25 |
| Wallets | LOBSTR signer extension, Freighter, Rabet |
| Package manager | pnpm 9.15.0 |
| CI | GitHub Actions |

## Wallet Integration

SkillFlow is non-custodial. The app stores public wallet state, but never stores private keys.

Current frontend wallet behavior:

- LOBSTR uses `@lobstrco/signer-extension-api`.
- Freighter uses the injected `window.freighterApi` provider.
- Rabet uses `window.rabet` when the extension is available.
- Wallets that are not detected show `Not installed`.
- A successful wallet connection stores the public key, wallet name, icon, and selected role in the persisted Zustand session.

LOBSTR note:

The LOBSTR mobile app alone is not detectable by a desktop browser tab. For desktop web connection, install the LOBSTR signer extension and connect it to the LOBSTR wallet app. The extension API provides `isConnected()` and `getPublicKey()` for browser dapp integration.

Wallet connection currently gates dashboard access. Transaction-signing flows should continue to use wallet-native signing and SEP-compatible transaction handoff where appropriate.

## Smart Contract Scope

The Soroban contract is intentionally limited to financial state and fund movement:

| Function | Responsibility |
| --- | --- |
| `initialize` | Sets treasury and commission configuration once. |
| `fund_escrow` | Transfers USDC from client to contract and records milestone amounts. |
| `approve_milestone` | Releases milestone funds to freelancer and platform treasury. |
| `raise_dispute` | Moves a pending milestone into disputed state. |
| `resolve_dispute` | Splits disputed funds according to arbitrator ruling. |
| `cancel_job` | Refunds escrow to the client when cancellation is allowed. |

Contract storage includes:

- Global initialization flag
- Treasury address
- Commission basis points
- Monotonic job counter
- Job records
- Per-job milestone records

Contract changes should always include:

- `cargo fmt --check`
- `cargo check`
- `cargo clippy --all-targets -- -D warnings`
- `cargo test`
- `cargo build`

## Backend Responsibilities

The backend owns off-chain product state and integration boundaries:

- Authentication and JWT issuance
- SEP-10 challenge support
- User profile and wallet association
- Job creation and browsing
- Application records
- Token purchase verification
- Milestone submission and approval records
- IPFS upload helpers
- Notification/audit hooks
- Stellar transaction building and verification helpers

The backend should treat on-chain state as the source of truth for fund movement, while PostgreSQL tracks the product workflow and mirrors transaction outcomes for UX and reporting.

## Frontend Experience

The frontend is built around a premium dark-mode SaaS interface:

- Landing page presents the client/freelancer split immediately.
- Wallet connect modal shows only actually detected wallets as connectable.
- Client dashboard focuses on posted work, proposals, funded escrow, and pending approvals.
- Freelancer dashboard focuses on active milestones, deliverables, applications, and payouts.
- Wallet state is persisted with Zustand under `skillflow-session`.

Primary routes:

| Route | Purpose |
| --- | --- |
| `/` | Role-based landing page |
| `/dashboard?role=client` | Client workspace |
| `/dashboard?role=freelancer` | Freelancer workspace |
| `/jobs` | Funded job browsing |
| `/jobs/[id]` | Job detail |
| `/tokens` | Application token purchase surface |
| `/settings` | Wallet and account settings |
| `/profile/[id]` | Public profile surface |

## Local Development

Requirements:

- Node.js 20+
- pnpm 9+
- Rust stable
- PostgreSQL if running backend persistence locally

Install dependencies:

```bash
pnpm install
```

Prepare environment files:

```bash
cp normal.env backend/.env
cp frontend/.env.local.example frontend/.env.local
```

Generate Prisma client:

```bash
pnpm prisma:generate
```

Run the frontend:

```bash
pnpm dev:frontend
```

Run the backend:

```bash
pnpm dev:backend
```

Run all package checks exposed by the root workspace:

```bash
pnpm check
```

## Environment Variables

`normal.env` documents the shared local values. Copy only the values needed by the target app.

Backend:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/skillflow?schema=public"
JWT_SECRET="change-me-in-production"
JWT_EXPIRES_IN="7d"
PORT="3001"
TREASURY_ADDRESS=""
TREASURY_SECRET=""
CONTRACT_ID=""
PINATA_API_KEY=""
PINATA_SECRET=""
```

Frontend:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
NEXT_PUBLIC_STELLAR_NETWORK="TESTNET"
```

Never commit real secrets. Local env files are ignored by Git.

## Verification

Frontend:

```bash
pnpm check:frontend
pnpm build:frontend
```

Backend:

```bash
pnpm prisma:generate
pnpm check:backend
```

Contracts:

```bash
cargo fmt --manifest-path contracts/Cargo.toml -- --check
cargo check --manifest-path contracts/Cargo.toml
cargo clippy --manifest-path contracts/Cargo.toml --all-targets -- -D warnings
cargo test --manifest-path contracts/Cargo.toml
cargo build --manifest-path contracts/Cargo.toml
```

## CI

GitHub Actions runs three independent jobs:

- Frontend: install dependencies, typecheck, build.
- Backend: install dependencies, generate Prisma client, build.
- Contracts: rustfmt, check, clippy, test, build.

The workflow relies on the pnpm version declared in `package.json`:

```json
"packageManager": "pnpm@9.15.0"
```

Do not also pin pnpm inside `pnpm/action-setup`; that creates a duplicate-version CI failure.

## Repository Hygiene

The `.gitignore` excludes generated, heavy, secret, and local-only files:

- `node_modules`
- `.next`
- `dist`
- `target`
- coverage output
- logs
- packaged archives
- local env files

AI/local agent folders are intentionally ignored and should not be committed:

- `.agents`
- `.codex`
- `.cursor`
- `.continue`
- `.claude`

## Maintainer Notes

Useful documents:

- `docs/ARCHITECTURE.md`
- `docs/MAINTAINER_GUIDE.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `CODE_OF_CONDUCT.md`

Review priorities:

- Wallet connection and signing correctness
- SEP-10 authentication correctness
- Token purchase replay protection
- Prisma schema changes and migration plan
- Contract authorization checks
- Escrow state transitions
- UI role-routing consistency
- CI parity with local verification commands

Before pushing:

1. Run checks for every touched workspace.
2. Confirm no generated folders are staged.
3. Confirm no `.agents`, `.codex`, or other local AI files are staged.
4. Confirm any new env value is documented without committing real secrets.
5. Keep commits scoped by workspace when possible.

## License

See `LICENSE`.
