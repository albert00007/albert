# MicroStateDev (MSD) — Corporate Website

Full-stack landing site for **MicroStateDev**, a software development agency based in Yerevan, Armenia.

## Stack

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 16.2.6 + React 19.2.4 + Tailwind CSS v4 + TypeScript |
| **Backend** | NestJS 11 + Apollo GraphQL + TypeORM + SQLite |
| **Dev tools** | Stitch MCP (Google Labs AI UI design), GPT 5.2 Codex conductor |

## Structure

```
lyov-sayt-msd/
├── apps/
│   ├── frontend/     — Next.js landing page
│   │   └── src/app/
│   │       ├── components/  — Header, About, Service, Portfolio, Contact, ContactForm, Footer, Effects
│   │       ├── hooks/       — useScrollAnimation
│   │       └── layout.tsx   — SEO + JSON-LD
│   └── backend/      — NestJS API
│       └── src/
│           ├── content/     — Content entity + GraphQL CRUD
│           └── inquiry/     — Inquiry entity + create mutation
├── legacy/           — Legacy files (previous CRA version)
└── README.md
```

## Quick start

```bash
# Frontend
cd apps/frontend
npm install
npm run dev        # → http://localhost:3001

# Backend
cd apps/backend
npm install
npm run start:dev  # → http://localhost:3000
```

## Build

```bash
cd apps/frontend && npm run build   # ✅ clean
cd apps/backend  && npm run build   # ✅ clean
```

## GraphQL API

`POST http://localhost:3000/graphql`

- `contents(section: String): [Content]` — get page content by section
- `content(id: Int!): Content` — single content item
- `createInquiry(input: CreateInquiryInput!): Inquiry` — submit contact form

## AI Models

- **Conductor**: OpenAI GPT 5.2 Codex (OAuth)
- **Available**: Gemini 2.5 Pro/Flash, DeepSeek V3/R1, GitHub Models (GPT-4o, Llama 3.1), Nemotron local

## Deployment Instructions (Production)

To deploy the MicroStateDev corporate website on a clean server, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/HappyTOPS/portfolio-next.git
   cd portfolio-next
   git checkout final-work
   ```

2. **Setup Environment Variables**
   Rename or create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   # Edit .env and securely set your JWT_SECRET and ADMIN_PASSWORD
   nano .env
   ```

3. **Start the Application**
   Using Docker Compose, build and run the services in detached mode:
   ```bash
   docker compose up -d --build
   ```

4. **Verify Deployment**
   - The site will be available on port `8080` (or `80` if configured through Nginx reverse proxy).
   - Check container logs if needed: `docker compose logs -f`
   - Admin panel is accessible at `/admin` (Default password is the one set in `.env`).
