/**
 * Content loaders. Every JSON file under /content is bundled at build time (client and SSR).
 * Folders that do not exist yet simply give empty lists.
 *
 *   /content/settings.json         settings
 *   /content/services/*.json       services  (ServicePage)
 *   /content/guides/*.json         guides    (Guide)
 *   /content/projects/*.json       projects  (Project)
 *   /content/reviews/*.json        reviews   (Review)
 *   /content/people/*.json         people    (Person)
 */
import type { Guide, Person, Project, Review, ServicePage, Settings } from "@/lib/types";

const files = import.meta.glob<unknown>("/content/**/*.json", { eager: true, import: "default" });

/** True on preview and local builds, false on the production deployment. */
export const isPreview: boolean = typeof __PREVIEW__ === "undefined" ? true : __PREVIEW__;

/**
 * Items with `pending` set (awaiting confirmation) show on the preview, marked, and never in
 * production.
 */
export const visible = <T extends { pending?: string }>(item: T): boolean => isPreview || !item.pending;

const idFrom = (path: string) => path.split("/").pop()!.replace(/\.json$/, "");

function collection<T>(folder: string): (T & { __file: string })[] {
  const prefix = `/content/${folder}/`;
  return Object.entries(files)
    .filter(([p]) => p.startsWith(prefix) && !p.slice(prefix.length).includes("/"))
    .map(([p, data]) => ({ ...(data as T), __file: idFrom(p) }));
}

const strip = <T,>(x: T & { __file: string }): T => {
  const { __file, ...rest } = x;
  void __file;
  return rest as T;
};

const byText = (a: string, b: string) => a.localeCompare(b, "en-IE");

// Settings -------------------------------------------------------------------

export const settings: Settings = (files["/content/settings.json"] ?? {}) as Settings;

// Services -------------------------------------------------------------------

export const allServices: ServicePage[] = collection<ServicePage>("services")
  .map((s) => ({ ...strip(s), slug: s.slug || s.__file }))
  .filter((s) => typeof s.route === "string" && s.route.startsWith("/"))
  .sort((a, b) => byText(a.name ?? "", b.name ?? ""));

/** All service pages, sorted by name. Includes hidden pages (they build but stay out of menus and the sitemap). */
export const services: ServicePage[] = allServices;

/** Service pages for menus and listings (hidden ones left out). */
export const listedServices: ServicePage[] = allServices.filter((s) => !s.hidden);

export const serviceByRoute = (route: string): ServicePage | undefined => {
  const r = route.replace(/\/+$/, "") || "/";
  return allServices.find((s) => s.route === r);
};

// Guides ---------------------------------------------------------------------

export const guides: Guide[] = collection<Guide>("guides")
  .map((g) => ({ ...strip(g), slug: g.slug || g.__file }))
  .filter((g) => typeof g.route === "string" && g.route.startsWith("/"))
  .sort((a, b) => byText(a.title ?? "", b.title ?? ""));

export const guideByRoute = (route: string): Guide | undefined => guides.find((g) => g.route === route);

// Projects -------------------------------------------------------------------

/** Published projects (and pending ones on the preview), by order then title. */
export const projects: Project[] = collection<Project>("projects")
  .map((p) => ({ ...strip(p), slug: p.slug || p.__file }))
  .filter((p) => p.published && visible(p))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || byText(a.title ?? "", b.title ?? ""));

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

/** Projects carrying a category tag (as set in a service page's projectsTag). */
export const projectsByTag = (tag: string | undefined): Project[] =>
  tag ? projects.filter((p) => p.categories?.includes(tag)) : [];

// Reviews --------------------------------------------------------------------

/** Reviews with show: true (and pending ones only on the preview), newest first. */
export const reviews: Review[] = collection<Review>("reviews")
  .map((r) => ({ ...strip(r), id: r.id || r.__file }))
  .filter((r) => r.show && visible(r))
  .sort((a, b) => byText(b.date ?? "", a.date ?? ""));

/** Reviews in the order the ids are given; unknown or hidden ids are skipped. */
export const reviewsByIds = (ids: string[] | undefined): Review[] =>
  (ids ?? []).map((id) => reviews.find((r) => r.id === id)).filter((r): r is Review => Boolean(r));

// People ---------------------------------------------------------------------

export const people: Person[] = collection<Person>("people")
  .map((p) => ({ ...strip(p), id: p.id || p.__file }))
  .filter((p) => p.show && visible(p))
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || byText(a.name ?? "", b.name ?? ""));

// Page content -----------------------------------------------------------------

/** Editable copy and media for fixed pages, from /content/pages/<name>.json. */
export function pageContent<T>(name: string): T {
  return (files[`/content/pages/${name}.json`] ?? {}) as T;
}
