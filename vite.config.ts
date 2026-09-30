import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/** Unconfirmed content (pending, unconfirmed prices) shows everywhere except Vercel production. */
const preview = process.env.VERCEL_ENV !== "production";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  define: {
    __PREVIEW__: JSON.stringify(preview),
  },
  ssr: {
    // Bundle CSS-only and ESM packages into the server build so Node can load it directly.
    noExternal: [/^@fontsource-variable\//],
  },
});
