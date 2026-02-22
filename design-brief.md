
# Brittek Digital: Creative Brief & Technical Spec

## 1. Creative Brief
**Concept:** "Neo-Luxury Engineering"
**Audience:** Ambitious startups, high-growth SMEs, and enterprise-tier firms looking for technical precision combined with high-end aesthetic value.
**Differentiators:**
- Systems-First Approach: Every design decision is backed by modular engineering logic.
- Sydney Energy: Reflecting the high-speed, sophisticated, and global nature of the Sydney tech hub.
- Absolute Performance: Awwwards-tier motion without compromising Lighthouse scores.

## 2. Design System Tokens (JSON)
```json
{
  "colors": {
    "primary": "#FE4A02",
    "accent": "#694E47",
    "background": "#0A0A0A",
    "surface": "#141414",
    "text": {
      "heading": "#FFFFFF",
      "body": "#A1A1AA"
    }
  },
  "typography": {
    "display": "Articulat CF, sans-serif",
    "body": "Helvetica Neue, Inter, sans-serif",
    "scale": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "container": "1280px",
    "gutter": "1.5rem"
  },
  "radii": {
    "sm": "2px",
    "md": "4px",
    "lg": "8px"
  }
}
```

## 3. Motion Spec (YAML)
```yaml
easing:
  primary: "power4.out"
  smooth: "expo.inOut"
  bounce: "back.out(1.7)"

durations:
  standard: 0.6s
  deliberate: 1.2s
  micro: 0.2s

stagger: 0.1s

interactions:
  magnetic:
    intensity: 0.5
    range: 100px
  parallax:
    hero: 0.2
    cards: 0.05
```

## 4. Site Map
- / (Home): The signature sequence
- /services: Technical & Creative deep-dive
- /work: Featured Case Studies
- /work/:slug: Detailed Project Breakdown
- /insights: Engineering & Automation thought leadership
- /about: Ethos & Capabilities
- /contact: Inquiries & Privacy-first lead gen
- /legal: Privacy & Terms

## 5. Prisma Schema
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model ContactSubmission {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  name      String
  email     String
  subject   String
  message   String
  consent   Boolean
  metadata  Json?
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  active    Boolean  @default(false)
  token     String   @unique
  createdAt DateTime @default(now())
}
```
