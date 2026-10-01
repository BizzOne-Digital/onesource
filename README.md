# One Source 360 LLC — Marketing Website

Frontend-only lead-generation site for **One Source 360 LLC**, built with **Vite**, **React**, **TypeScript**, and **React Router**.

## Features

- Five designed routes: Home, About Us, Services, Testimonials, Contact
- Brand-aligned UI using the supplied logo (black, electric blue `#007BFF`, silver, white)
- Motion and scroll reveals via Framer Motion (`prefers-reduced-motion` respected)
- Accessible estimate form with validation (Formspree when configured)
- Click-to-call CTAs: `tel:+18634568958`
- SPA routing ready for Vercel (`vercel.json` rewrites)

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Environment variables

Copy `.env.example` to `.env` and set your Formspree endpoint:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

1. Create a form at [Formspree](https://formspree.io).
2. Paste the form URL into `VITE_FORMSPREE_ENDPOINT`.
3. Restart the dev server after changing `.env`.

If the endpoint is **not** set, the Contact page shows a configuration notice and highlights the phone CTA — the site does **not** fake a successful submission.

## Email configuration

The partial email value `onesource360llc` is stored in `src/config/site.ts` as `emailLocalPart`. Add the full address there when available. Do not commit secrets or SMTP credentials in frontend code.

## Adding testimonials

Default sample reviews live in `src/lib/reviews.ts` (`seedTestimonials`). Replace them with verified customer feedback when ready.

Visitors can click **Write a review** (floating button on every page) to add a review. Submissions are saved in the browser **`localStorage`** and appear on the Testimonials page immediately on that device. They are **not** sent to the business automatically — this is frontend-only storage for demo purposes.

## Build & deploy

```bash
npm run build
npm run preview
```

Deploy the `dist` folder to Vercel (or any static host). Vercel uses the included rewrite so direct links like `/services` load correctly.

## Project structure

- `src/config/site.ts` — business copy, services, testimonials data, form helper
- `src/components/` — layout, header, footer, form, motion primitives
- `src/pages/` — route-level page layouts
- `public/logo.png` — official company logo

## License

Proprietary — One Source 360 LLC.
