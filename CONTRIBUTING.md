# Contributing

Thanks for helping improve SkillFlow.

## Local Setup

1. Install Node.js 20+, pnpm 9+, Rust, and the Soroban toolchain.
2. Install dependencies:

```bash
pnpm install
```

3. Generate Prisma types:

```bash
pnpm prisma:generate
```

4. Start the frontend:

```bash
pnpm dev
```

## Quality Checks

Run the full monorepo check before opening a PR:

```bash
pnpm check
```

Useful scoped commands:

```bash
pnpm check:frontend
pnpm check:backend
pnpm check:contracts
```

## Pull Requests

Keep PRs focused, include screenshots for UI changes, and document contract or schema changes in `docs/`.
