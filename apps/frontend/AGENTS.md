<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: lyov-sayt-msd — MicroStateDev

## 🎯 What is this?
Landing page / corporate site for **MicroStateDev (MSD)** — a full-stack software development agency based in Yerevan, Armenia.

**GitHub**: `github.com/HappyTOPS/lyov-sayt-msd.git`  
**Domain**: `https://microstatedev.com`

---

## 🏗 Full Stack

### Frontend (`apps/frontend`)
| Tech | Version |
|------|---------|
| Next.js | 16.2.6 |
| React | 19.2.4 |
| Tailwind CSS | v4 (utility classes only, no separate .css files) |
| TypeScript | ✅ All code in .tsx |

**Build**: `next build` → ✅ clean | Routes: `/` + `/_not-found`

### Backend (`apps/backend`)
| Tech | Version |
|------|---------|
| NestJS | 11 |
| GraphQL (Apollo) | code-first |
| TypeORM | + SQLite (`database.sqlite`) |
| TypeScript | ✅ |

**Build**: `nest build` → ✅ clean  
**Port**: 3000  
**CORS**: localhost:3000, localhost:3001

---

## 📁 Frontend Structure

```
src/app/
├── components/
│   ├── header/Header.tsx        — Sticky header + hamburger menu + gradient CTA
│   ├── about/About.tsx          — About section with cards
│   ├── service/Service.tsx      — Services cards
│   ├── portfolio/Portfolio.tsx  — 6 project cards in CSS Grid
│   ├── contact/Contact.tsx      — Contact info (email, phone)
│   ├── contact-form/ContactForm.tsx — Form with validation + GraphQL mutation
│   ├── footer/Footer.tsx        — Links, social icons, gradient bg
│   └── effects/
│       ├── GradientBackground.tsx      — 3 animated gradient orbs
│       └── ScrollProgressIndicator.tsx  — Reading progress bar
├── hooks/
│   └── useScrollAnimation.ts    — IntersectionObserver hook (fade-up/left/right)
├── globals.css                  — Tailwind + custom CSS (animations, card-base, section-bg, etc.)
├── layout.tsx                   — Root layout with SEO metadata + JSON-LD
└── page.tsx                     — Main page (assembles all sections)
```

**Components (all .tsx, Tailwind v4 utilities):**
- **Header**: sticky top, responsive (≤700px hamburger dropdown), gradient CTA button, nav links to About/Service/Portfolio/Contact
- **About**: `section-bg` + `card-base` + `heading-underline`, 2 paragraphs about the agency
- **Service**: 3 service cards (Web, Mobile, Backend) with icons
- **Portfolio**: 6 project cards with tech tags, hover effects (translateY + border glow)
- **Contact**: email (tech@microstatedev.com) + phone (+374 41 355 605) with hover states
- **ContactForm**: 4 fields (name, email, phone, message), validation, Apollo GraphQL mutation to backend
- **Footer**: nav links, social icons (GitHub, Telegram, LinkedIn, email), gradient bg

**Theme**: Dark (#09090B bg, #8B5CF6 accent purple, #6366F1 indigo, #67E8F9 cyan)

**Animations**:
- `useScrollAnimation` hook — fade-up/fade-left/fade-right on scroll via IntersectionObserver
- `GradientBackground` — 3 floating color orbs (30s float animation)
- `ScrollProgressIndicator` — reading progress bar at top

**SEO**:
- Meta tags: title, description, keywords
- Open Graph: title, description, URL, site name
- Twitter Card: summary_large_image
- JSON-LD: Organization + WebSite schemas
- robots: index, follow

---

## 📁 Backend Structure

```
src/
├── app.module.ts        — Root: TypeORM (SQLite) + GraphQL (Apollo) + all modules
├── app.controller.ts    — Basic REST endpoint
├── main.ts              — Bootstrap, CORS config
├── ping/ping.module.ts  — Health check
├── content/
│   ├── content.entity.ts    — id, title, description, section, icon, order, timestamps
│   ├── content.service.ts   — findAll (section filter), findOne
│   ├── content.resolver.ts  — contents(content section), content(id) queries
│   └── content.module.ts
└── inquiry/
    ├── inquiry.entity.ts        — id, name, email, phone, message, createdAt
    ├── inquiry.service.ts       — create(input)
    ├── inquiry.resolver.ts      — createInquiry mutation
    └── inquiry.module.ts
```

**GraphQL API**:
- Query `contents(section: String)`: [Content] — get content by section
- Query `content(id: Int!)`: Content — single content item
- Mutation `createInquiry(input: CreateInquiryInput!)`: Inquiry — submit contact form

---

## 🤖 AI Models Available

| Provider | Models | Status |
|----------|--------|--------|
| **OpenAI** | GPT 5.2 Codex (conductor), GPT 5.2, GPT 5.1 family | ✅ OAuth |
| **Vertex AI** | Gemini 2.5 Pro, Gemini 2.5 Flash | ✅ GCloud |
| **DeepSeek** | DeepSeek V3, DeepSeek R1 | ✅ |
| **GitHub Models** | GPT-4o, GPT-4o-mini, Llama 3.1 405B, Llama 3.1 8B | ✅ (GitHub token) |
| **Nemotron (local)** | Nemotron 3 Nano 4B | ✅ (LM Studio) |
| **Groq** | Llama / Mixtral | ❌ No API key |
| **Together AI** | Open models | ❌ No API key |
| **Claude (Vertex)** | — | ❌ 404 |

**Stitch MCP**: Google Labs AI UI design tool — available as local MCP server

---

## 🧠 Who I Am

**Sisyphus** — Powerful AI Agent with orchestration capabilities from OhMyOpenCode.

My role in this project:
1. Parse requirements → decompose into tasks
2. Delegate specialized work (frontend → visual-engineering, backend → deep, research → librarian/explore)
3. Verify results → ensure clean builds → ship
4. I work with multiple sub-agents in parallel for maximum throughput

---

## 🚀 Dev Commands

```bash
# Frontend
cd apps/frontend
npm run dev      # → http://localhost:3001
npm run build    # Next.js build

# Backend
cd apps/backend
npm run start:dev  # → http://localhost:3000
npm run build      # Nest build
```
