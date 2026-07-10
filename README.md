# Draft2Quote

Draft2Quote converts customer-facing Shopify draft-order invoice HTML into reviewed B2B PDF quotations. It does **not** use Shopify Admin, Storefront, Partner, OAuth, webhooks, GraphQL, REST Admin endpoints, custom apps, private app credentials, or access tokens.

## Architecture assessment

This repository was empty except for `.gitkeep`, so there was no existing framework, database, authentication system, parser, PDF library, data model, or deployment config to preserve. This implementation uses a dependency-free TypeScript/Node HTTP app, Prisma/SQLite schema documentation, a deterministic layered HTML parser, a deterministic PDF writer, Node test fixtures, and a store allowlist.

## Parser problems found

No current parser existed. The implemented parser avoids the common failure mode of a single CSS selector set by layering structured data, semantic tables, label totals, address elements, structural item patterns, confidence, evidence, and financial reconciliation.

## Implementation plan

1. Define stable `QuoteData` and parser versioning.
2. Add fixture-driven layered extraction.
3. Add URL allowlisting, HTTPS-only validation, DNS/private-IP checks, redirect validation, redaction, and safe static retrieval.
4. Add review UI and diagnostics surface without rendering untrusted HTML.
5. Add deterministic PDF generation with button, visible URL, and QR code using the exact checkout URL.
6. Add Prisma models for stores and quote history.
7. Document security and development workflow.

## Commands

- `npm install`
- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run test:fixtures`
- `npm run test:integration`
- `npm run build`
- `npm run db:migrate`

## Fixtures

Sanitized HTML fixtures live in `tests/fixtures`. Expected behavior is asserted in `tests/parser-fixtures.test.ts`.

## Security requirements

Only approved Shopify storefront/checkout hosts may be fetched. Invoice URLs are sensitive, redacted in errors, and are never sent to third-party parsing services. Untrusted Shopify HTML is parsed into `QuoteData`; it is not rendered directly.

## Vercel build note

The build script uses `tsc`, so `typescript` is declared in `devDependencies`. Vercel must install development dependencies during the build step; do not deploy with an install mode that omits dev dependencies before running `npm run build`.
