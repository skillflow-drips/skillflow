# SkillFlow

Premium freelance escrow for Stellar.

SkillFlow is a monorepo for a wallet-native freelance marketplace where clients fund milestone escrow in USDC and freelancers receive approved payouts directly to their Stellar wallet. The product is split into two clear workspaces from the landing page: a client workspace for job posters and a freelancer workspace for workers.

## Product Flow

### Client

Clients use SkillFlow to:

- Post jobs with budgets and milestone scopes.
- Fund escrow upfront in USDC on Stellar.
- Review proposals and select freelancers.
- Approve milestone deliverables.
- Sign wallet transactions that release payment from escrow.

### Freelancer

Freelancers use SkillFlow to:

- Browse funded work.
- Apply for jobs with application tokens.
- Submit milestone deliverables.
- Get paid when the client approves.
- Receive USDC directly to their connected Stellar wallet.

The landing page routes users into the right role. Selecting either role opens wallet connection first, then routes to `/dashboard?role=client` or `/dashboard?role=freelancer`.

## Wallet Support

SkillFlow does not custody user funds or private keys.

Current frontend wallet behavior:

- LOBSTR uses `@lobstrco/signer-extension-api` for browser signer extension detection and public key access.
- Freighter uses the injected browser wallet API when available.
- Rabet is detected through `window.rabet` when the browser extension is available.
- Wallets that are not detected show `Not installed` instead of pretending to connect.

For LOBSTR on desktop, install the LOBSTR signer extension and connect it to the LOBSTR wallet app. The mobile wallet alone cannot be detected by a desktop browser tab without the signer extension bridge.

## Monorepo Layout

```text
skillflow/
├── .github/workflows/ci.yml
├── backend/
│   ├── prisma/schema.prisma
│   └── src/
├── contracts/
│   ├── Cargo.toml
│   └── src/
├── docs/
│   ├── ARCHITECTURE.md
│   └── MAINTAINER_GUIDE.md
├── frontend/
│   ├── public/wallets/
│   └── src/
├── normal.env
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Tech Stack

| Area | Stack |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, Zustand |
| Backend | NestJS 11, Prisma 6, PostgreSQL, Stellar SDK |
| Contracts | Rust 2024, Soroban SDK 25 |
| Wallets | LOBSTR signer extension, Freighter, Rabet |
| Package manager | pnpm 9.15.0 |
| CI | GitHub Actions |

## Local Setup

Install dependencies from the repository root:

```bash
pnpm install
```

Copy environment values from `normal.env` into the app-specific env files you need:

```bash
cp normal.env backend/.env
cp frontend/.env.local.example frontend/.env.local
```

Start the frontend:

```bash
pnpm dev:frontend
```

Start the backend:

```bash
pnpm dev:backend
```

Generate Prisma client:

```bash
pnpm prisma:generate
```

## Verification

Run frontend checks:

```bash
pnpm check:frontend
pnpm build:frontend
```

Run backend checks:

```bash
pnpm prisma:generate
pnpm check:backend
```

Run contract checks:

```bash
cargo fmt --manifest-path contracts/Cargo.toml -- --check
cargo check --manifest-path contracts/Cargo.toml
cargo clippy --manifest-path contracts/Cargo.toml --all-targets -- -D warnings
cargo test --manifest-path contracts/Cargo.toml
cargo build --manifest-path contracts/Cargo.toml
```

## CI

GitHub Actions runs three jobs:

- Frontend: install, typecheck, build.
- Backend: install, Prisma generate, build.
- Contracts: rustfmt, check, clippy, test, build.

The workflow uses the pnpm version declared in `package.json` through `packageManager`.

## Contract Scope

The Soroban contract is intentionally limited to money movement and escrow state:

- Initialize treasury and commission settings.
- Fund escrow.
- Approve milestones.
- Raise disputes.
- Resolve disputes.
- Cancel jobs and refund escrow.

Job metadata, applications, deliverables, profiles, reviews, and notification records live off-chain in the backend database.

## Repository Hygiene

Generated files are ignored:

- `node_modules`
- `.next`
- `dist`
- `target`
- coverage output
- logs
- local env files

Local AI agent folders are also ignored and must not be committed:

- `.agents`
- `.codex`
- `.cursor`
- `.continue`
- `.claude`

## Maintainer Notes

Useful docs:

- `docs/ARCHITECTURE.md`
- `docs/MAINTAINER_GUIDE.md`
- `CONTRIBUTING.md`
- `SECURITY.md`

Before pushing, run the relevant local checks for the area you touched. Contract changes should always pass format, check, clippy, test, and build.
