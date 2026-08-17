# MF Project Solutions — mfprojectsolutions.ie

A local rebuild of the MF Project Solutions website on the same stack as the
original (React + Vite + TypeScript + Tailwind + React Router + lucide-react).

## Running

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Routes

| Route                     | Page                                    |
| ------------------------- | --------------------------------------- |
| `/`                       | Home                                    |
| `/about`                  | About                                   |
| `/snagging`               | Snagging services + pricing             |
| `/garden-rooms`           | Service page                            |
| `/home-extensions`        | Service page                            |
| `/bathroom-renovations`   | Service page                            |
| `/kitchen-renovations`    | Service page                            |
| `/interior-design`        | Service page                            |
| `/landscaping-pergolas`   | Service page                            |
| `/garden-calculator`      | Interactive garden renovation estimator |

## Layout

```
src/
  components/     Header, Footer (home), SiteFooter (inner pages),
                  ServicePage (shared template for the 6 service routes),
                  Hero, WhoWeAre, Services, CtaBanner, Testimonials,
                  ModernLiving, InstagramFeed, Contact
  data/           services.ts, snagging.ts, testimonials.ts, calculator.ts
  pages/          Index, About, Snagging, GardenCalculator, NotFound
public/assets/    Images and video from the original site
public/reviews/   Google review avatars
```

The six service pages share one `ServicePage` template driven by `src/data/services.ts`.
Each page is a list of typed blocks (`transform`, `benefits`, `features`, `work`,
`faq`, `calculatorCta`) rendered in order, because the original varies both the
order and the mix of sections per service.

## Notes

- **Instagram feed** — the original's Elfsight widget is retained (app id
  `d2788800-628c-4387-b23b-8bf3a96fab77`), loaded from `static.elfsight.com`.
  This is the only external dependency; everything else is served locally.
- **Garden calculator** — prices, VAT rate, contingency, roll width and waste
  rate live in `src/data/calculator.ts`. Edit that file to change pricing.
  The quote button opens a `mailto:` to the address in the same file.
- **Two footers** — the home page uses the tall dark footer (`Footer`);
  every inner page uses the compact bordered one (`SiteFooter`) with a
  per-page tagline. Snagging and the calculator have their own variants.
- **Fonts** are the stock Tailwind stacks (`font-serif` = Georgia et al.),
  matching the original — there are no webfonts to load.
- **Deploying to Vercel**: it's a SPA, so add a rewrite so deep links resolve:

  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

  in `vercel.json`, otherwise `/about` etc. 404 on a hard refresh.
