# Draft2Quote Agent Guide

## Purpose
Internal web app converting customer-facing Shopify draft-order invoice URLs into reviewed branded PDF quotations.

## Architecture
Dependency-free TypeScript/Node HTTP UI in `src/server.ts`, Prisma data model in `prisma/schema.prisma`, layered parser in `lib/parser`, secure retrieval in `lib/retrieval.ts` and `lib/security/url.ts`, deterministic PDF template in `lib/pdf.ts`, fixtures in `tests/fixtures`.

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Tests: `npm test`, `npm run test:fixtures`, `npm run test:integration`
- DB migration: `npm run db:migrate`

## Parser architecture
Use layered extraction: structured data, semantic HTML, label totals, structural patterns, store adapters, and low-confidence fallback. Preserve evidence and confidence for every important field.

## Security
Never add Shopify API/OAuth/token fields or call Shopify Admin/Storefront/Partner APIs. Treat invoice URLs as secrets; redact tokens in logs/errors. Enforce HTTPS, store allowlists, DNS/private-IP rejection, redirect validation, content-type and size limits. Do not render untrusted Shopify HTML.

## Definition of done
Typecheck, lint, unit tests, fixture tests, integration tests, build, migration review, PDF checkout URL consistency, invalid/private URL rejection, no Shopify API code, and updated docs.
