# SkillFlow

> Decentralized Freelance Escrow Platform on Stellar

SkillFlow is a decentralized freelance platform where clients post jobs and freelancers apply using platform tokens. Payments are locked in USDC escrow within a Soroban smart contract and released to the freelancer's Lobstr wallet when milestones are approved. The platform takes a 5% commission on every milestone release, which the smart contract splits automatically.

---

## How It Works

### For Clients
1. Post a job with a budget and milestone breakdown: this is free, as nothing moves on-chain.
2. Review freelancer applications and accept one.
3. Fund the escrow: scan a QR code in Lobstr to send USDC into the smart contract.
4. Review submitted work and approve milestones: scan the QR code in Lobstr to release payment.
5. The smart contract automatically sends 95% to the freelancer and 5% to the SkillFlow treasury.

### For Freelancers
1. Buy application tokens: pay 1 USDC to get 5 tokens via Lobstr.
2. Use 1 token per job application: this prevents bots and spam.
3. Get assigned by a client and complete the work.
4. Upload deliverables to IPFS and submit the milestone on SkillFlow.
5. Once the client approves, USDC arrives directly in your Lobstr wallet. No withdrawal step is needed.

> **Note:** You need a small amount of XLM in your Lobstr wallet to pay Stellar network transaction fees. USDC alone is not enough. You can get XLM on Lobstr or from the [Stellar testnet faucet](https://laboratory.stellar.org/#account-creator).

---

## Token System

To prevent bots and low-quality applications, freelancers must hold platform tokens to apply for jobs.

| Action | Cost |
|---|---|
| Buy tokens | 1 USDC = 5 tokens |
| Apply for a job | 1 token per application |
| Token expiry | Tokens never expire |

**Token purchase flow:**
1. Freelancer clicks Buy Tokens on SkillFlow
2. SkillFlow generates a SEP-7 QR code for a 1 USDC payment to SkillFlow treasury, with the user's `numericMemoId` attached as a Stellar ID memo
3. Freelancer opens Lobstr, scans QR, approves the payment
4. Stellar network confirms in ~5 seconds
5. SkillFlow detects the confirmed on-chain transaction and credits 5 tokens in the database
6. Freelancer can now apply for up to 5 jobs

**Memo format:** A Stellar `MEMO_ID` (64-bit unsigned integer) set to the user's `numericMemoId` auto-increment value. We do not use a text memo because Stellar text memos are limited to 28 bytes — a UUID is 36 characters and will be rejected.

**What is on-chain:** The 1 USDC payment from freelancer to SkillFlow treasury

**What is off-chain:** Token balance per user and application records are stored in PostgreSQL.

**Backend verification checks (in order):**
1. `tx.memo_type === 'id'` — reject if the type is text, hash, or anything else
2. `parseInt(tx.memo) === user.numericMemoId` — reject if memo does not match the authenticated user
3. Destination address matches `TREASURY_ADDRESS`
4. Amount is exactly 1 USDC with the correct asset issuer
5. `txHash` does not already exist in the `TokenPurchase` table — return 409 if duplicate

---

## Commission

SkillFlow charges 5% on every milestone payment, which the smart contract deducts automatically upon approval. The client does not pay extra; the commission comes directly out of the milestone amount.

**Example: 100 USDC milestone**
- Freelancer receives: 95 USDC (sent directly to their Lobstr wallet).
- SkillFlow treasury receives: 5 USDC.
- Both transfers happen in one atomic transaction.

---

## On-chain vs Off-chain

| Data / Action | Where |
|---|---|
| User profiles, bios, skills, ratings | Off-chain: PostgreSQL |
| Job postings and milestone descriptions | Off-chain: PostgreSQL |
| Application records and cover letters | Off-chain: PostgreSQL |
| Token balances per user | Off-chain: PostgreSQL |
| Reviews and ratings | Off-chain: PostgreSQL |
| Notifications | Off-chain: PostgreSQL |
| Work deliverable files | Off-chain: IPFS |
| Dispute evidence files | Off-chain: IPFS |
| Token purchase (1 USDC payment) | **On-chain: Stellar payment tx** |
| Fund escrow (client locks USDC) | **On-chain: Soroban contract** |
| Milestone release (95% + 5% fee split) | **On-chain: Soroban contract** |
| Job cancellation and refund | **On-chain: Soroban contract** |
| Dispute resolution split | **On-chain: Soroban contract** |

---

## Wallet

SkillFlow has no built-in wallet. All transactions are signed by the user in their Lobstr wallet (or any SEP-7 compatible Stellar wallet).

**How it works:**
1. SkillFlow builds an unsigned Stellar transaction (XDR)
2. SkillFlow generates a SEP-7 URI and QR code from the XDR
3. User opens Lobstr and scans the QR code (desktop) or taps "Open in Lobstr" (mobile)
4. Lobstr shows the full transaction details for the user to review
5. User approves: Lobstr signs and submits the transaction to the Stellar network
6. SkillFlow listens for the confirmed transaction and updates its database

The platform never holds private keys or controls user funds directly.

> **Lobstr SEP-7 note:** Lobstr supports signing Soroban `InvokeHostFunction` transactions via SEP-7 `tx` URIs. Desktop users can also use the [Lobstr browser signer extension](https://lobstr.co/signer-extension/) for a smoother experience. Test your QR signing flow thoroughly on testnet before mainnet launch.

---

## Authentication

SkillFlow uses **SEP-10 (Stellar Web Authentication)** to verify wallet ownership. This is required for mainnet: a public address alone proves nothing without a cryptographic signature.

**SEP-10 flow:**
1. The client requests a challenge from `GET /auth/challenge?address=G...`.
2. The server returns a signed challenge transaction (XDR). This transaction has sequence number **0** so it can never be submitted to the network — it exists solely for signature verification. It contains a `ManageData` operation sourced from the user's address, with key `"skillflow.io auth"` and a random 32-byte value.
3. The user signs the challenge in Lobstr (via SEP-7 QR or signer extension). No funds move during this step.
4. The client sends the signed XDR to `POST /auth/wallet`. The server verifies the signature and issues a JWT.

This ensures only the holder of the private key can authenticate as a specific Stellar address.

**SDK functions used in `sep10.service.ts` (from `@stellar/stellar-sdk`):**
```typescript
// Build the challenge (server side)
WebAuth.buildChallengeTx(serverKeypair, clientAddress, homeDomain, timeout, networkPassphrase)

// Verify the signed challenge (server side)
WebAuth.verifyChallengeTxSigners(signedXdr, serverPublicKey, networkPassphrase, homeDomains, webAuthDomain, signers)
```

Do not implement custom SEP-10 logic. Use these SDK utilities directly — they handle all edge cases defined in SEP-10 v3.4.1 including time bounds, sequence number validation, and server signature verification.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contract | Rust + Soroban SDK 23.x (Stellar) |
| Backend | Node.js + NestJS + PostgreSQL + Prisma |
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Wallet | Lobstr (SEP-7 compatible) |
| Stablecoin | USDC on Stellar |
| File Storage | IPFS via Pinata |
| Auth | GitHub OAuth + SEP-10 Stellar Web Authentication |
| State management | Zustand |
| Form validation | react-hook-form + zod |

---

## Project Structure

```
skillflow/
│
├── contracts/
│   ├── Cargo.toml
│   ├── Cargo.lock
│   └── src/
│       ├── lib.rs                          # Contract entry point
│       ├── contract.rs                     # All 6 contract functions
│       ├── storage.rs                      # Storage keys and helpers
│       ├── types.rs                        # Job, Milestone structs and enums
│       ├── errors.rs                       # ContractError enum
│       └── test.rs                         # All contract unit tests
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── .env.example
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── app.controller.ts               # GET /health
│       ├── prisma.service.ts
│       │
│       ├── auth/
│       │   ├── auth.module.ts
│       │   ├── auth.controller.ts          # GET /auth/challenge, POST /auth/wallet, POST /auth/github
│       │   ├── auth.service.ts
│       │   ├── sep10.service.ts            # SEP-10 challenge generation and verification
│       │   ├── github.strategy.ts
│       │   ├── jwt.strategy.ts
│       │   ├── jwt-auth.guard.ts
│       │   └── dto/
│       │       ├── wallet-auth.dto.ts      # { signedXdr: string, stellarAddress: string }
│       │       └── github-auth.dto.ts
│       │
│       ├── users/
│       │   ├── users.module.ts
│       │   ├── users.controller.ts         # GET /users/:id, PATCH /users/me, GET /users/me/jobs
│       │   ├── users.service.ts
│       │   └── dto/
│       │       └── update-user.dto.ts
│       │
│       ├── jobs/
│       │   ├── jobs.module.ts
│       │   ├── jobs.controller.ts          # GET /jobs, POST, GET /:id, PATCH, POST /:id/cancel
│       │   ├── jobs.service.ts
│       │   └── dto/
│       │       ├── create-job.dto.ts
│       │       └── update-job.dto.ts
│       │
│       ├── applications/
│       │   ├── applications.module.ts
│       │   ├── applications.controller.ts  # POST /jobs/:id/apply, GET, PATCH
│       │   ├── applications.service.ts     # Checks and deducts token on apply
│       │   └── dto/
│       │       └── create-application.dto.ts
│       │
│       ├── milestones/
│       │   ├── milestones.module.ts
│       │   ├── milestones.controller.ts    # /submit, /approve, /dispute
│       │   ├── milestones.service.ts
│       │   └── dto/
│       │       ├── submit-milestone.dto.ts
│       │       └── approve-milestone.dto.ts
│       │
│       ├── disputes/
│       │   ├── disputes.module.ts
│       │   ├── disputes.controller.ts      # GET /disputes, POST /disputes/:id/resolve
│       │   ├── disputes.service.ts
│       │   └── dto/
│       │       └── resolve-dispute.dto.ts
│       │
│       ├── reviews/
│       │   ├── reviews.module.ts
│       │   ├── reviews.controller.ts       # POST /jobs/:id/review
│       │   ├── reviews.service.ts
│       │   └── dto/
│       │       └── create-review.dto.ts
│       │
│       ├── tokens/
│       │   ├── tokens.module.ts
│       │   ├── tokens.controller.ts        # GET /tokens/balance, POST /tokens/buy, POST /tokens/verify-purchase
│       │   ├── tokens.service.ts           # Verify on-chain tx, credit tokens in DB
│       │   └── dto/
│       │       └── verify-purchase.dto.ts  # { txHash } — user identity comes from JWT, not request body
│       │
│       ├── stellar/
│       │   ├── stellar.module.ts
│       │   ├── stellar.service.ts          # XDR builders, tx listener, tx submission
│       │   └── stellar.config.ts           # RPC URL, contract address, treasury address
│       │
│       ├── ipfs/
│       │   ├── ipfs.module.ts
│       │   └── ipfs.service.ts             # Pinata upload and URL helpers
│       │
│       └── notifications/
│           ├── notifications.module.ts
│           └── notifications.service.ts
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.ts
│   ├── .env.local.example
│   ├── public/
│   │   ├── logo.svg
│   │   └── favicon.ico
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx                    # / landing page
│       │   ├── globals.css
│       │   ├── jobs/
│       │   │   ├── page.tsx                # /jobs browse
│       │   │   ├── new/
│       │   │   │   └── page.tsx            # /jobs/new create job
│       │   │   └── [id]/
│       │   │       ├── page.tsx            # /jobs/:id detail
│       │   │       └── manage/
│       │   │           └── page.tsx        # /jobs/:id/manage client dashboard
│       │   ├── dashboard/
│       │   │   └── page.tsx                # /dashboard freelancer dashboard
│       │   ├── tokens/
│       │   │   └── page.tsx                # /tokens buy tokens
│       │   ├── disputes/
│       │   │   └── page.tsx                # /disputes arbitrator panel
│       │   ├── profile/
│       │   │   └── [id]/
│       │   │       └── page.tsx            # /profile/:id public profile
│       │   └── settings/
│       │       └── page.tsx                # /settings wallet and preferences
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── Sidebar.tsx
│       │   ├── jobs/
│       │   │   ├── JobCard.tsx
│       │   │   ├── JobFilters.tsx
│       │   │   ├── JobForm.tsx
│       │   │   ├── MilestoneBuilder.tsx
│       │   │   ├── ApplicationCard.tsx
│       │   │   └── ApplicationList.tsx
│       │   ├── milestones/
│       │   │   ├── MilestoneCard.tsx
│       │   │   ├── MilestoneTimeline.tsx
│       │   │   ├── SubmitDeliverable.tsx
│       │   │   └── ApproveModal.tsx        # Shows QR for Lobstr signing
│       │   ├── disputes/
│       │   │   ├── DisputeCard.tsx
│       │   │   ├── EvidenceUploader.tsx
│       │   │   └── ArbitratorPanel.tsx
│       │   ├── tokens/
│       │   │   ├── TokenBalance.tsx        # Shows token count from DB
│       │   │   ├── BuyTokensModal.tsx      # SEP-7 QR for 1 USDC payment
│       │   │   └── TokenGate.tsx           # Blocks apply button if balance is 0
│       │   ├── wallet/
│       │   │   ├── ConnectLobstr.tsx       # SEP-10 challenge/sign flow
│       │   │   ├── WalletBadge.tsx         # Shows truncated G... address
│       │   │   ├── QRModal.tsx             # SEP-7 QR + Open in Lobstr button
│       │   │   └── TxListener.tsx          # Polls Horizon for tx confirmation
│       │   ├── profile/
│       │   │   ├── ProfileHeader.tsx
│       │   │   ├── SkillTags.tsx
│       │   │   ├── ReviewList.tsx
│       │   │   └── JobHistory.tsx
│       │   └── ui/
│       │       ├── Button.tsx
│       │       ├── Input.tsx
│       │       ├── Modal.tsx
│       │       ├── Badge.tsx
│       │       ├── Avatar.tsx
│       │       ├── Spinner.tsx
│       │       ├── Toast.tsx
│       │       └── EmptyState.tsx
│       │
│       ├── lib/
│       │   ├── sep7.ts                     # Build SEP-7 URIs and QR codes
│       │   ├── sep10.ts                    # SEP-10 challenge signing helpers
│       │   ├── stellar-listener.ts         # Poll Horizon for tx confirmation
│       │   ├── ipfs.ts
│       │   ├── api.ts
│       │   └── utils.ts
│       │
│       ├── hooks/
│       │   ├── useWallet.ts                # Includes SEP-10 challenge flow
│       │   ├── useJobs.ts
│       │   ├── useMilestones.ts
│       │   ├── useTokenBalance.ts          # Fetch token balance from DB
│       │   └── useTxConfirmation.ts        # Poll Horizon for on-chain confirmation
│       │
│       ├── store/
│       │   ├── index.ts
│       │   ├── walletStore.ts
│       │   └── userStore.ts                # Includes tokenBalance field
│       │
│       └── types/
│           ├── job.ts
│           ├── user.ts
│           └── stellar.ts                  # Sep7Uri, TxResult, ContractJob types
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── feature.md
│   │   └── bug.md
│   └── workflows/
│       ├── test.yml
│       └── deploy.yml
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## Database Models

```prisma
model User {
  id              String          @id @default(uuid())
  stellarAddress  String          @unique
  numericMemoId   Int             @unique @default(autoincrement()) // Stellar ID memo (integer) for token purchases
  githubId        String?         @unique
  name            String
  avatar          String?
  bio             String?
  skills          String[]
  rating          Float           @default(0)
  tokenBalance    Int             @default(0)
  createdAt       DateTime        @default(now())
  clientJobs      Job[]           @relation("ClientJobs")
  applications    Application[]
  reviewsGiven    Review[]        @relation("ReviewsGiven")
  reviewsReceived Review[]        @relation("ReviewsReceived")
  tokenPurchases  TokenPurchase[]
  disputes        Dispute[]
}

model Job {
  id            String        @id @default(uuid())
  clientId      String
  client        User          @relation("ClientJobs", fields: [clientId], references: [id])
  freelancerId  String?
  title         String
  description   String
  budget        Decimal
  currency      String        @default("USDC")
  status        JobStatus     @default(OPEN)
  contractJobId BigInt?       // On-chain u64 job ID returned by fund_escrow. BigInt is required — Int (32-bit) overflows u64.
  skills        String[]
  milestones    Milestone[]
  applications  Application[]
  reviews       Review[]
  transactions  Transaction[]
  createdAt     DateTime      @default(now())
}

model Milestone {
  id               String          @id @default(uuid())
  jobId            String
  job              Job             @relation(fields: [jobId], references: [id])
  milestoneIndex   Int             // 0-based index matching the on-chain milestone_id (u32) used in approve_milestone, raise_dispute, resolve_dispute
  title            String
  description      String
  amount           Decimal
  status           MilestoneStatus @default(PENDING)
  deliveryIpfsHash String?
  dueDate          DateTime?
  disputes         Dispute[]
  transactions     Transaction[]
}

model Application {
  id             String            @id @default(uuid())
  jobId          String
  job            Job               @relation(fields: [jobId], references: [id])
  freelancerId   String
  freelancer     User              @relation(fields: [freelancerId], references: [id])
  coverLetter    String
  proposedAmount Decimal
  status         ApplicationStatus @default(PENDING)
  createdAt      DateTime          @default(now())

  @@unique([jobId, freelancerId])
}

model TokenPurchase {
  id            String   @id @default(uuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  txHash        String   @unique
  usdcAmount    Decimal
  tokensAwarded Int
  confirmed     Boolean  @default(false)
  createdAt     DateTime @default(now())
}

model Dispute {
  id           String        @id @default(uuid())
  jobId        String
  job          Job           @relation(fields: [jobId], references: [id])
  milestoneId  String
  milestone    Milestone     @relation(fields: [milestoneId], references: [id])
  raisedById   String
  raisedBy     User          @relation(fields: [raisedById], references: [id])
  evidenceHash String?
  arbitratorId String?
  ruling       String?
  status       DisputeStatus @default(OPEN)
  createdAt    DateTime      @default(now())
}

model Transaction {
  id          String          @id @default(uuid())
  jobId       String
  job         Job             @relation(fields: [jobId], references: [id])
  milestoneId String?
  milestone   Milestone?      @relation(fields: [milestoneId], references: [id])
  txHash      String          @unique
  amount      Decimal
  type        TransactionType
  createdAt   DateTime        @default(now())
}

model Review {
  id          String   @id @default(uuid())
  jobId       String
  job         Job      @relation(fields: [jobId], references: [id])
  reviewerId  String
  reviewer    User     @relation("ReviewsGiven", fields: [reviewerId], references: [id])
  revieweeId  String
  reviewee    User     @relation("ReviewsReceived", fields: [revieweeId], references: [id])
  rating      Int
  comment     String
  createdAt   DateTime @default(now())
}

enum JobStatus { OPEN ASSIGNED IN_PROGRESS COMPLETED DISPUTED CANCELLED }
enum MilestoneStatus { PENDING SUBMITTED APPROVED DISPUTED }
enum ApplicationStatus { PENDING ACCEPTED REJECTED }
enum DisputeStatus { OPEN UNDER_REVIEW RESOLVED }
enum TransactionType { ESCROW_FUND MILESTONE_RELEASE PLATFORM_FEE REFUND DISPUTE_SPLIT }
```

---

## Smart Contract Functions

The contract is kept minimal on purpose: only operations involving on-chain money movement live here. Job metadata and milestone submissions are handled off-chain.

| Function | On-chain effect |
|---|---|
| `initialize` | Sets treasury address and 5% commission rate: callable once. |
| `fund_escrow` | Transfers USDC from client Lobstr to contract; stores job amount and milestone breakdown. |
| `approve_milestone` | Sends 95% USDC to freelancer and 5% to treasury. |
| `raise_dispute` | Locks milestone in DISPUTED state. |
| `resolve_dispute` | Splits USDC per arbitrator ruling. |
| `cancel_job` | Refunds USDC from contract to client. |

> **Note:** `create_job` and `submit_milestone` have been removed from the contract. Job metadata lives in PostgreSQL. Deliverable hashes live in PostgreSQL and IPFS. Only financial operations occur on-chain.

---

## Contract Key Types

Job IDs are stored as `u64` (not `Symbol`) to avoid Soroban `Symbol` character and length restrictions. The on-chain job ID is an auto-incrementing counter stored in contract persistent storage under `DataKey::JobCounter`, incremented atomically by `fund_escrow` on each call.

```rust
#[contracttype]
pub enum DataKey {
    Job(u64),
    JobMilestone(u64, u32),  // (job_id, milestone_index)
    Treasury,
    CommissionBps,
    Initialized,
    JobCounter,
}
```

---

## Complete Money Flow

```
TOKEN PURCHASE (off-chain tracking, on-chain payment)
Freelancer sends 1 USDC via Lobstr to SkillFlow treasury (on-chain).
Memo: user.numericMemoId as a Stellar MEMO_ID (integer type — not text).
SkillFlow fetches the tx from Horizon, checks memo_type === 'id',
matches parseInt(tx.memo) to user.numericMemoId, then credits 5 tokens in DB (off-chain).

APPLY FOR JOB (entirely off-chain)
Freelancer clicks Apply; backend checks if tokenBalance is at least 1.
Deducts 1 token in the database and saves the application (off-chain).

FUND ESCROW (on-chain)
Client accepts freelancer and clicks Fund Escrow.
SkillFlow builds XDR and generates a SEP-7 QR code.
Client scans in Lobstr and approves.
USDC moves from client Lobstr to the Soroban contract.
On-chain storage: job_id (u64 from JobCounter), total_amount, milestone_amounts[].
Backend saves the returned job_id as contractJobId (BigInt) in PostgreSQL.

MILESTONE APPROVAL (on-chain, 5% fee split)
Client approves milestone; SkillFlow builds XDR using contractJobId (BigInt) + milestoneIndex (Int).
Client scans the QR code in Lobstr and approves.
Smart contract sends: 95 USDC to freelancer Lobstr and 5 USDC to the SkillFlow treasury.

DISPUTE RESOLUTION (on-chain)
Arbitrator submits ruling; SkillFlow builds the resolution XDR.
Arbitrator approves in Lobstr.
Smart contract splits the escrowed amount according to the ruling.
Both parties receive funds in their Lobstr wallets.

CANCEL JOB (on-chain)
Client cancels; SkillFlow builds the cancellation XDR.
Client approves in Lobstr.
The full escrow amount is refunded to the client's Lobstr wallet.
```

---

## USDC Units

All USDC amounts passed to the smart contract are in **USDC base units** (7 decimal places):

`1 USDC = 10,000,000 base units`

This matches how Stellar's USDC token contract represents amounts. Be careful not to confuse these with XLM "stroops": the term is different even if the precision is the same.

---

## Environment Variables

### Backend `.env`
```env
DATABASE_URL=postgresql://user:password@localhost:5432/skillflow
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
CONTRACT_ADDRESS=
TREASURY_ADDRESS=
IPFS_API_KEY=
IPFS_API_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
JWT_SECRET=
JWT_EXPIRES_IN=7d
PORT=3001
COMMISSION_RATE=0.05
TOKEN_PRICE_USDC=1
TOKENS_PER_PURCHASE=5
SEP10_SERVER_SIGNING_KEY=        # Private key of the SkillFlow server for SEP-10 challenges
SEP10_HOME_DOMAIN=skillflow.io   # Must match the ManageData key prefix used in challenge transactions
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_TREASURY_ADDRESS=
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
NEXT_PUBLIC_TOKENS_PER_PURCHASE=5
NEXT_PUBLIC_TOKEN_PRICE_USDC=1
```

---

## Local Development

```bash
git clone https://github.com/skillflow-drips/skillflow.git
cd skillflow

docker-compose up -d

cd backend && npm install && npx prisma migrate dev && npm run start:dev

cd ../frontend && npm install && npm run dev

# Build smart contract (requires Rust + Stellar CLI)
cd ../contracts && stellar contract build
# Output: target/wasm32v1-none/release/skillflow.wasm
```

### Rust / Stellar CLI setup
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add wasm32v1-none target (used by Soroban SDK 23+)
rustup target add wasm32v1-none

# Install Stellar CLI (includes contract build, deploy, invoke)
cargo install stellar-cli --locked
```

---

## Contributing

SkillFlow is part of the Stellar Wave Program on Drips. Browse issues labeled `stellar-wave` to find tasks and earn USDC rewards for merged pull requests.

---

## Known Limitations (v1)

- **Arbitrator = Treasury:** Dispute resolution is controlled by the same key that receives platform fees. This is a v1 simplification. A multisig arbitrator address is planned for a future version.
- **No contract upgradeability:** The v1 contract is not upgradeable. A new deployment would require migrating escrow funds manually.
- **Lobstr SEP-7 Soroban support:** While Lobstr supports Soroban transaction signing, the `tx` URI type for complex Soroban calls should be tested thoroughly on testnet. Desktop users may have a better experience with the Lobstr browser signer extension.

---
