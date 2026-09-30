import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/** Temporary page body until the lead developer's design replaces it. */
export default function Placeholder({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">Placeholder</p>
      <h1 className="mt-2 font-serif text-4xl text-foreground">{name}</h1>
      {children}
      <p className="mt-10">
        <Link to="/" className="underline">
          Home
        </Link>
      </p>
    </main>
  );
}
