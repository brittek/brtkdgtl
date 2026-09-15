# Setup and verification

This repository is a lightweight Vite + React reference surface. The current package manifest does not define Prisma, PostHog, Resend, a database layer or application secrets.

## Requirements

- Node.js 20 or later
- pnpm

## Install

```bash
git clone https://github.com/brittek/brtkdgtl.git
cd brtkdgtl
pnpm install
```

## Development

```bash
pnpm dev
```

Vite prints the local development URL when the server starts.

## Production build

```bash
pnpm build
```

The generated static bundle is written to `dist/`.

## Local production preview

```bash
pnpm preview
```

## Environment variables

No environment variables are currently required by the repository source or package scripts.

Do not add placeholder credentials or inherited environment variables unless the implementation actually consumes them.

## Verification checklist

Before merging material changes:

- [ ] `pnpm build` completes successfully.
- [ ] Navigation and controls are reachable by keyboard.
- [ ] Visible focus treatment remains clear.
- [ ] Interactive states work with pointer, touch and keyboard input.
- [ ] Motion honours `prefers-reduced-motion`.
- [ ] Text remains legible at narrow mobile widths.
- [ ] No unnecessary runtime dependency has been introduced.
- [ ] Public claims and project references remain current and publishable.

## Deployment

This repository produces a static Vite bundle. Any compatible static host can serve the `dist/` output.

Deployment configuration is not evidence that a specific environment is currently live. Verify the target platform, domain, headers and cache behaviour independently before making production claims.

---

Brittek Digital · https://brittek.net
