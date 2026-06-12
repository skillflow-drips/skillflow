# Maintainer Guide

This repository is structured to demonstrate maintainable full-stack ownership:

- Clear monorepo package boundaries
- Repeatable workspace commands
- CI checks for TypeScript and Rust
- Contributor, security, and governance docs
- Contract logic isolated from application state

## Release Checklist

1. Run `pnpm check`.
2. Run contract tests when present.
3. Review Prisma schema changes and migrations.
4. Verify frontend build output.
5. Confirm environment variables are documented in `normal.env`.
6. Tag the release and include migration notes.

## Review Priorities

Focus review on:

- Wallet authentication correctness
- Transaction verification and replay protection
- Database field consistency
- Contract authorization checks
- User-facing escrow state transitions
