import { Link } from "react-router-dom";
import { Head } from "@/lib/head";

/** Rendered for unknown URLs and written to dist/404.html by the prerender step. */
export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <Head title="Page not found | MF Project Solutions" description="This page does not exist." noindex priority={2} />
      <h1 className="font-serif text-4xl text-foreground">Page not found</h1>
      <p className="mt-4 text-muted-foreground">The page you were looking for has moved or does not exist.</p>
      <Link to="/" className="mt-8 underline">
        Go to the home page
      </Link>
    </main>
  );
}
