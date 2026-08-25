# Working on this site

`main` is live. Merging to it deploys to mfprojectsolutions.ie within a couple
of minutes, so preview your work before it lands.

## Making a change

```bash
git checkout main && git pull
git checkout -b feat/short-description
npm install
npm run dev          # http://localhost:5173 — live reload
```

When it looks right locally, check the production build too. Some things only
break once bundled:

```bash
npm run build && npm run preview
```

Push the branch and open a pull request. Vercel comments a preview URL on the PR
within a minute or two — that link is shareable, so it is the easiest way to get
sign-off from someone who does not run the site locally. Merge when approved.

## Reviews on the home page

The rating and review count come from Google at build time
(`scripts/fetch-google-rating.mjs`) and land in `src/data/google-rating.json`.
Do not edit that file by hand — every build regenerates it. It is committed so
the build still works if the API is unreachable.

The 16 testimonials in `src/data/testimonials.ts` are curated by hand. Google's
API only ever returns five reviews, so they cannot be pulled automatically.
Dates are stored as ISO strings and the "x months ago" label is worked out at
render time, so it never goes stale.

A weekly GitHub Action rebuilds the site to refresh the numbers.

## Things that will bite you

- Never prefix a secret with `VITE_`. Vite inlines those into the public
  JavaScript bundle. `GOOGLE_PLACES_API_KEY` is deliberately unprefixed.
- DNS lives at Register365, not Vercel, because the domain carries the company's
  email. Never move the nameservers to Vercel.
