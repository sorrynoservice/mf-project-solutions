import { serviceByRoute } from "@/lib/content";
import Placeholder from "./Placeholder";

/** One component for every service page in /content/services. The lead developer replaces this. */
export default function ServiceLandingPlaceholder({ route }: { route: string }) {
  const page = serviceByRoute(route);
  if (!page) return <Placeholder name={route} />;
  return (
    <Placeholder name={page.hero?.h1 ?? page.name}>
      <p className="mt-4 text-muted-foreground">{page.hero?.sub}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {page.pageCode} · {route}
      </p>
    </Placeholder>
  );
}
