
# Setup & Deployment Instructions

## Environment Variables
Create a `.env` file with the following:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/brittek"

# Email (Resend)
RESEND_API_KEY="re_..."

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Security
CSP_NONCE_SECRET="your-secret-nonce"
```

## Local Development
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Push database schema: `npx prisma db push`.
4. Seed database (optional): `npx prisma db seed`.
5. Run dev server: `npm run dev`.

## Deployment (Vercel)
1. Link your GitHub repo to Vercel.
2. Add the environment variables in the Vercel dashboard.
3. Vercel will automatically run `npm run build` which includes Prisma generation.

## QA Checklist
- [ ] Accessibility: Tab through all nav items. Ensure focus ring is visible (#FE4A02).
- [ ] Performance: Run Lighthouse on the Work page. Target 95+.
- [ ] Security: Verify CSP headers block inline scripts.
- [ ] Forms: Test contact submission with empty fields. Verify Zod validation.
- [ ] Responsive: Check Hero narrative on iPhone SE (375px width).
