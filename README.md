# REIN LUX REINIGUNG

Production-oriented Next.js website for REIN LUX REINIGUNG OG.

## Development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```

## Contact form environment variables

Copy `.env.example` to `.env.local` locally, or configure the values in Vercel:

```env
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_TO_EMAIL=office@reinlux.at
CONTACT_FROM_EMAIL=REIN LUX Website <onboarding@resend.dev>
```

Never expose `RESEND_API_KEY` through a `NEXT_PUBLIC_` variable.

## Audit

See `AUDIT.md` for the production frontend, accessibility, SEO, performance and form-hardening audit.
