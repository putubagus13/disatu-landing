# Disatu landing

The company site for **Disatu**, a studio that builds company-profile websites, mobile apps, backend systems and web
apps such as e-commerce. Disatu's own product, ChartLab, has its own site in a separate project (`chartlab-landing`).

Bilingual (`/id`, `/en`), dark/light/system theme. Built with TanStack Start (React 19, Vite), Tailwind v4,
framer-motion, Vitest. Node 22.

| Page | What it is |
|---|---|
| `/{lang}` | Hero, services, five-step work process, products (ChartLab), about teaser, contact |
| `/{lang}/about` | About Disatu and its founder |
| `/{lang}/chartlab` | Old address of the embedded ChartLab app: a permanent redirect to the app page on the ChartLab landing |

## Run it

```bash
nvm use 22
npm install
npm run dev        # http://localhost:3001 (the ChartLab landing uses 3000)
npm test
```

## Environment variables

| Variable | Needed | Default | What it is |
|---|---|---|---|
| `VITE_CHARTLAB_LANDING_URL` | **required for production builds** | `http://localhost:3000` in dev | The ChartLab landing. The product card links to `<url>/<lang>`, and `/{lang}/chartlab` redirects to `<url>/<lang>/chartlab`. |

`npm run build` stops with "VITE_CHARTLAB_LANDING_URL is not set" when it is missing, so a site whose links to
ChartLab would be broken never ships.

## Deploy order

1. Deploy `chartlab-landing` first (it needs `VITE_DISATU_URL` = this site's production URL).
2. Set `VITE_CHARTLAB_LANDING_URL` in this project's Vercel environment variables to the ChartLab landing's
   production URL.
3. Then merge and deploy this site. Doing it in this order keeps the already-shared `/id/chartlab` and `/en/chartlab`
   links working: they redirect to the live ChartLab app page.

## Content rules

All copy lives in `src/content/site.id.ts` and `site.en.ts` (same shape, checked by tests). The site states only real
facts about Disatu. `tests/disatu-copy.test.ts` fails on invented clients, testimonials or client/project counts, and
on trading copy outside the product card and About.
