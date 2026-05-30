@AGENTS.md

## Quick Reference

**Stack**: Next.js 16.2.6 + React 19.2.4 + Tailwind v4 (frontend) | NestJS 11 + Apollo GraphQL + TypeORM + SQLite (backend)

**Frontend build**: `npm run build` (dir: apps/frontend) → clean, routes: / + /_not-found
**Backend build**: `npm run build` (dir: apps/backend) → clean
**Dev**: `npm run dev` → localhost:3001 | `npm run start:dev` → localhost:3000

**GraphQL API** (backend:3000/graphql):
- Query `contents(section: String)`: [Content]
- Mutation `createInquiry(input: CreateInquiryInput!)`: Inquiry

**Key patterns**:
- All components in src/app/components/ as .tsx with Tailwind v4 utilities
- CSS variables in globals.css (--bg, --accent, --surface, etc.)
- Custom CSS classes only for pseudo-elements/animations (card-base, section-bg, heading-underline)
- Dark theme: #09090B bg, #8B5CF6 accent
