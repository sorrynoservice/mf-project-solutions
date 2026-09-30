/**
 * The app's routes, without a router. src/entry-client.tsx wraps it in <BrowserRouter> and
 * src/entry-server.tsx in <StaticRouter>, so the same tree renders in the browser and at build
 * time. Pages are registered in src/routes.tsx.
 */
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import NotFoundPage from "@/pages/placeholders/NotFoundPage";
import { Head } from "@/lib/head";
import { routes, type RouteDef } from "@/routes";

/** Applies the registry meta for a route, then renders the page. */
const RoutePage = ({ route }: { route: RouteDef }) => (
  <>
    <Head
      title={route.meta.title}
      description={route.meta.description}
      path={route.path}
      noindex={route.meta.noindex}
      jsonLd={route.meta.jsonLd}
      ogImage={route.meta.ogImage}
      priority={0}
    />
    {route.element}
  </>
);

const App = () => (
  <>
    <ScrollToTop />
    <Routes>
      {routes.map((r) => (
        <Route key={r.path} path={r.path} element={<RoutePage route={r} />} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <FloatingWhatsApp />
  </>
);

export default App;
