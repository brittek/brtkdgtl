# brtkdgtl

Public interface study for [Brittek Digital](https://brittek.net), an independent design-engineering practice in Sydney, Australia.

This repository is a compact React/Vite surface used to explore Brittek interaction, motion and presentation patterns. It is intentionally smaller than the production Brittek environment and should be read as an interface study rather than a complete representation of the studio's infrastructure.

## System

- React 19
- TypeScript
- Vite 6
- GSAP
- GitHub Pages delivery
- pnpm for package management

## Principles

The implementation follows the same operating constraints used across Brittek work:

- semantic structure before decoration;
- accessible interaction states;
- purposeful motion;
- low dependency overhead;
- clear information hierarchy;
- performance as an interface property;
- maintainable, legible source.

## Local development

Requirements:

- Node.js 20 or newer
- pnpm

```bash
git clone https://github.com/brittek/brtkdgtl.git
cd brtkdgtl
pnpm install
pnpm dev
```

Vite will print the local development URL after startup.

## Verification

Run the complete repository check before shipping changes:

```bash
pnpm check
```

The check performs:

```text
TypeScript verification
        ↓
Vite production build
```

Individual commands are also available:

```bash
pnpm typecheck
pnpm build
pnpm preview
```

## Deployment

GitHub Actions builds the Vite application and deploys the generated `dist/` directory to GitHub Pages.

The deployment workflow is intentionally limited to reproducible build and delivery concerns. The canonical Brittek production platform, operational services and private infrastructure are maintained separately.

## Brand boundary

Brittek Digital treats AI as infrastructure rather than identity. Public-facing work should remain focused on design quality, systems thinking, engineering clarity and durable implementation.

Canonical brand references:

- paper: `#F4F3EF`
- ink: `#0D0D0B`
- signal orange: `#FE4A02`

## Security

Do not publish credentials, private API keys, customer data or deployment secrets in this repository. Security-sensitive reports should be sent privately to [hello@brittek.net](mailto:hello@brittek.net).

## Licence

Copyright © Brittek Digital. All rights reserved unless a file states otherwise.
