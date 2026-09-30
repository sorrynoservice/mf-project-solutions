import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "./index.css";
import App from "./App";
import { HeadProvider, createClientHead } from "@/lib/head";
import { installLinkTracking } from "@/lib/track";

installLinkTracking();

const head = createClientHead();
const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <HeadProvider collector={head}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeadProvider>
  </StrictMode>
);

// Prerendered pages arrive with markup to hydrate; `vite dev` serves an empty root.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
