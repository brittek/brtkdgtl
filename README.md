<div align="center">

# BRITTEK DIGITAL

**Design Systems. AI Infrastructure. High-Performance Web Engineering.**

Building premium digital systems for ambitious businesses through strategy, engineering, and intelligent automation.

[Website](https://brittek.net) • [Portfolio](https://brittek.net/work) • [Contact](mailto:hello@brittek.net)

---

</div>

## Overview

Brittek Digital is a Sydney-based digital design and engineering studio focused on building high-performance websites, scalable design systems, AI-powered workflows, and modern digital products.

Every project is engineered around four principles:

- Performance-first architecture
- Systems-based design
- AI-native workflows
- Long-term maintainability

This repository contains the source code powering the Brittek Digital platform.

---

## Core Capabilities

### Web Design & Development

Fast, technically robust websites built using modern frameworks with a strong focus on accessibility, SEO, Core Web Vitals and long-term scalability.

### AI Automation

Practical AI systems that automate repetitive work, improve internal operations and integrate into existing business workflows.

### Brand Systems

Identity systems designed to create consistency across digital products, marketing and customer experiences.

---

## Featured Projects

| Project | Industry | Description |
|----------|-----------|-------------|
| **Sharpe Carpentry** | Construction | Premium residential carpentry positioned through clean UX and conversion-focused design. |
| **Incog Systems** | Privacy Technology | Secure GrapheneOS devices with a privacy-first digital identity. |
| **Neat. Homes** | Property Services | Premium subscription cleaning platform with refined branding and UX. |
| **Autumn Estate** | Hospitality | Property experience platform focused on clarity, booking simplicity and speed. |
| **Hydra** | Infrastructure | Brand and digital concept for next-generation energy and data centre infrastructure. |
| **Applied Interfaces** | Research & Development | Experimental interaction design, motion systems and interface prototypes. |
| **Régime Sydney** | Fashion | Contemporary luxury streetwear identity and digital ecosystem. |

---

## Technology Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP
- Lenis

### Backend

- FastAPI
- Prisma
- PostgreSQL
- Supabase

### Infrastructure

- Cloudflare Pages
- Cloudflare Workers
- Cloudflare R2
- Cloudflare KV
- Cloudflare D1

### Tooling

- pnpm
- Biome
- Vitest
- Playwright
- Lighthouse CI

---

## Repository Structure

```
app/
components/
content/
hooks/
lib/
public/
styles/
types/
prisma/
```

---

## Environment Variables

Create a `.env.local` file.

```bash
# Database
DATABASE_URL="postgresql://..."

# Email
RESEND_API_KEY="re_..."

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Security
CSP_NONCE_SECRET="..."

# AI
OPENAI_API_KEY="..."
ANTHROPIC_API_KEY="..."
```

---

## Local Development

Clone the repository.

```bash
git clone https://github.com/brittek-digital/brittek.git
```

Install dependencies.

```bash
pnpm install
```

Generate Prisma client.

```bash
pnpm prisma generate
```

Push the database schema.

```bash
pnpm prisma db push
```

Run the development server.

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

## Build

Production build

```bash
pnpm build
```

Preview production build

```bash
pnpm start
```

Lint

```bash
pnpm lint
```

Type checking

```bash
pnpm typecheck
```

Run tests

```bash
pnpm test
```

---

## Design Principles

- Performance over decoration
- Accessibility by default
- Motion with purpose
- Minimal dependencies
- Strong information hierarchy
- Semantic HTML
- Maintainable architecture

---

## Performance Targets

| Metric | Target |
|---------|---------|
| Lighthouse | 95+ |
| LCP | <2.0s |
| CLS | <0.05 |
| INP | <200ms |
| WCAG | AA |

---

## Deployment

The project is designed for Cloudflare Pages.

Typical deployment flow:

```bash
pnpm install
pnpm build
```

Configure all environment variables within your deployment platform before publishing.

---

## Internal Products

- Brittek UI Kit
- Privacy Pro Hub
- Studio Mockups
- Hydra
- Neural OS
- BKOS (Brittek Knowledge Operating System)

---

## Philosophy

Great digital products are engineered—not decorated.

Brittek Digital combines systems thinking, modern engineering and thoughtful design to create software, websites and brands that remain fast, maintainable and commercially effective long after launch.

---

## Licence

Copyright © Brittek Digital.

All rights reserved.
```
