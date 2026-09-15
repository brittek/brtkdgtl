<!--
BRITTEK DIGITAL — PUBLIC REFERENCE SURFACE
Design engineering · interface systems · interaction studies
https://brittek.net
-->

# Brittek Digital — Public Reference Surface

A compact public-facing prototype and interaction reference for Brittek Digital.

This repository is **not** the canonical production website. It exists as a lightweight design-engineering surface for interface experiments, motion studies and presentation concepts that may later inform production work.

## Purpose

The repository explores how Brittek Digital's human-facing layer can express:

- restrained editorial hierarchy;
- clear interaction states;
- purposeful motion;
- accessible, semantic interface structure;
- high-performance frontend behaviour;
- a consistent visual grammar around the Brittek identity.

Reference work is treated as input, not authority. Production decisions are reconciled against the current Brittek design, engineering and accessibility system before adoption.

## Current stack

The package manifest currently defines a small Vite application built with:

- React 19
- TypeScript
- Vite 6
- GSAP
- Node.js 20+

There is no database, Prisma layer, PostHog integration, FastAPI runtime or production Cloudflare stack in this repository. Those technologies belong to other Brittek systems where explicitly implemented.

## Local development

Requirements:

- Node.js 20 or later
- pnpm

```bash
git clone https://github.com/brittek/brtkdgtl.git
cd brtkdgtl
pnpm install
pnpm dev
```

Build the static production bundle:

```bash
pnpm build
```

Preview the generated bundle locally:

```bash
pnpm preview
```

## Repository map

```text
App.tsx                 primary application composition
components/             interface components
data.ts                  content/data definitions
hooks/                   interaction hooks
lib/                     shared utilities
index.tsx                React entry point
index.html               document shell
metadata.json            project metadata
design-brief.md          historical concept brief
setup-instructions.md    repository-specific setup notes
```

## Design direction

Current Brittek defaults favour:

- warm editorial public surfaces;
- near-black `#0D0D0B` for primary ink;
- warm paper `#F4F3EF` for public backgrounds;
- orange `#FE4A02` as the primary functional accent;
- Inter Tight for display/interface typography;
- Geist Mono for identifiers and evidence;
- sharp geometry and restrained motion;
- reduced-motion support and keyboard parity.

The historical `design-brief.md` is retained as provenance. It is not current doctrine where it conflicts with the active Brittek system.

## Engineering rules

- Prefer semantic HTML and native browser behaviour.
- Keep interaction state legible with keyboard, pointer and touch input.
- Use transform and opacity for motion where practical.
- Honour `prefers-reduced-motion`.
- Avoid dependencies that do not materially improve the system.
- Treat performance as part of the visual result.
- Keep prototype-specific decisions isolated from production architecture.

## Relationship to Brittek Digital

Brittek Digital is an independent Sydney-based design-engineering studio building digital environments, identity systems, frontend systems, publishing systems, tooling and machine-readable structures.

AI may support implementation and infrastructure, but it is not the studio's public identity.

- Website: https://brittek.net
- Contact: hello@brittek.net
- GitHub: https://github.com/brittek

## Licence

Copyright © Brittek Digital.

All rights reserved unless a file explicitly states otherwise.
