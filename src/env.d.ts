/// <reference types="vite/client" />

/** True on every build except Vercel production (VERCEL_ENV === "production"). Set in vite.config.ts. */
declare const __PREVIEW__: boolean;
