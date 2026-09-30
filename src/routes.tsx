/**
 * Route registry. One entry per page: the element, its head meta, and whether it goes in the
 * sitemap. App.tsx renders these routes, scripts/prerender.mjs writes a static HTML file for
 * each, and the sitemap is built from them.
 *
 * To give a page its real design, swap the placeholder element here. Meta for content pages
 * (services, guides, projects) comes from the JSON in /content.
 */
import type { ReactNode } from "react";
import { guides, projects, services } from "@/lib/content";
import { SITE_URL, SITE_NAME } from "@/lib/head";
import type { MediaItem } from "@/lib/types";
import GardenCalculator from "@/pages/GardenCalculator";
import Placeholder from "@/pages/placeholders/Placeholder";
import ServiceLandingPlaceholder from "@/pages/placeholders/ServiceLandingPlaceholder";
import GuidePlaceholder from "@/pages/placeholders/GuidePlaceholder";
import ProjectPlaceholder from "@/pages/placeholders/ProjectPlaceholder";
import ProjectsPlaceholder from "@/pages/placeholders/ProjectsPlaceholder";

export type RouteMeta = {
  title: string;
  description: string;
  noindex?: boolean;
  jsonLd?: object[];
  ogImage?: string;
};

export type RouteDef = {
  path: string;
  element: ReactNode;
  meta: RouteMeta;
  /** Include in sitemap.xml. Default true unless noindex. */
  sitemap?: boolean;
  /** Sitemap priority 0 to 1. */
  priority?: number;
};

const suffix = ` | ${SITE_NAME}`;
const withSuffix = (t: string) => (t.includes(SITE_NAME) ? t : t + suffix);

/** og:image from a content image: the original JPEG (link previews handle JPEG more reliably than WebP). */
const ogFrom = (m?: MediaItem): string | undefined => m?.image || undefined;

/** "Title, Area" unless the title already names the area. */
const projectTitle = (title: string, location?: string) => {
  const area = (location ?? "").split(",")[0].trim();
  return !area || title.toLowerCase().includes(area.toLowerCase()) ? title : `${title}, ${location}`;
};

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.path === "/" ? `${SITE_URL}/` : SITE_URL + it.path,
  })),
});

const faqPage = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const fixed = (
  path: string,
  name: string,
  title: string,
  description: string,
  extra: Partial<RouteDef> = {},
): RouteDef => ({
  path,
  element: <Placeholder name={name} />,
  meta: { title: withSuffix(title), description },
  priority: path === "/" ? 1 : 0.7,
  ...extra,
});

const fixedRoutes: RouteDef[] = [
  fixed(
    "/",
    "Home",
    "Design and Build Contractor in Dublin, Meath and Kildare",
    "Whole-house renovations, extensions and commercial fit-outs, designed and built by one team with its own joinery workshop. Arrange a site visit.",
  ),
  fixed(
    "/residential",
    "Residential",
    "Home Renovations and Extensions in Dublin",
    "Whole-house renovations, extensions, attic conversions, kitchens, bathrooms and bespoke joinery, often working with your architect.",
    { priority: 0.9 },
  ),
  fixed(
    "/commercial",
    "Commercial",
    "Commercial Fit-Out in Dublin: Clinics, Restaurants, Retail",
    "Commercial design and fit-out for clinics, restaurants, retail and offices, closed out with your design team.",
    { priority: 0.9 },
  ),
  fixed(
    "/about",
    "About",
    "About MF Project Solutions",
    "A design and build contractor based in Drumree, Co. Meath, with its own site team and joinery workshop.",
  ),
  fixed(
    "/for-architects",
    "For architects",
    "Working with Architects and Designers",
    "A main contractor that builds to your drawings, prices openly and closes out with your design team.",
  ),
  fixed(
    "/property-services",
    "Property services",
    "Snagging and Property Inspections in Dublin",
    "Snag lists for new homes and pre-purchase inspections, documented with photos and delivered quickly.",
  ),
  {
    path: "/projects",
    element: <ProjectsPlaceholder />,
    meta: {
      title: withSuffix("Projects: Renovations, Extensions and Fit-Outs"),
      description: "Homes and commercial units designed and built by MF Project Solutions, from before to handover.",
    },
    priority: 0.9,
  },
  fixed(
    "/contact",
    "Contact",
    "Contact MF Project Solutions",
    "Call, WhatsApp or send an enquiry to arrange a site visit in Dublin, Meath, Kildare or Louth.",
  ),
  fixed(
    "/how-we-work",
    "How we work",
    "How We Work: From Site Visit to Handover",
    "How a project runs with MF Project Solutions, from the first visit and fixed price to handover.",
  ),
  fixed("/faqs", "FAQs", "Frequently Asked Questions", "Answers to common questions about pricing, timing, planning and how we work."),
  {
    path: "/garden-calculator",
    element: <GardenCalculator />,
    meta: {
      title: withSuffix("Garden Landscaping Price Calculator"),
      description: "Build an instant estimate for patios, artificial grass, planting beds, drainage and garden structures.",
    },
    priority: 0.6,
  },
  fixed("/privacy", "Privacy", "Privacy Policy", "How MF Project Solutions collects, uses and protects personal data.", {
    priority: 0.2,
  }),
  fixed("/cookies", "Cookies", "Cookie Policy", "The cookies this website uses and how to change your choices.", {
    priority: 0.2,
  }),
  fixed("/thank-you", "Thank you", "Thank You", "Thanks for getting in touch. We will reply shortly.", {
    meta: { title: withSuffix("Thank You"), description: "Thanks for getting in touch.", noindex: true },
    sitemap: false,
  }),
];

const serviceRoutes: RouteDef[] = services.map((s) => ({
  path: s.route,
  element: <ServiceLandingPlaceholder route={s.route} />,
  meta: {
    title: withSuffix(s.seo?.title ?? s.name),
    description: s.seo?.description ?? "",
    noindex: s.hidden || undefined,
    ogImage: ogFrom(s.hero?.image),
    jsonLd: [
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: s.name, path: s.route },
      ]),
      ...(s.faqs?.length ? [faqPage(s.faqs)] : []),
    ],
  },
  sitemap: !s.hidden,
  priority: 0.9,
}));

const guideRoutes: RouteDef[] = guides.map((g) => ({
  path: g.route,
  element: <GuidePlaceholder route={g.route} />,
  meta: {
    title: withSuffix(g.seo?.title ?? g.title),
    description: g.seo?.description ?? g.lead ?? "",
    ogImage: ogFrom(g.hero),
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g.title,
        dateModified: g.updated,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
    ],
  },
  priority: 0.6,
}));

const projectRoutes: RouteDef[] = projects.map((p) => ({
  path: `/projects/${p.slug}`,
  element: <ProjectPlaceholder slug={p.slug} />,
  meta: {
    title: withSuffix(projectTitle(p.title, p.location)),
    description: p.summary ?? "",
    ogImage: ogFrom(p.hero),
    jsonLd: [
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: p.title, path: `/projects/${p.slug}` },
      ]),
    ],
  },
  priority: p.flagship ? 0.8 : 0.6,
}));

/**
 * Content pages (services, guides) win over a fixed placeholder at the same path, except the
 * calculator, which is a finished page.
 */
const KEEP_FIXED = new Set(["/", "/garden-calculator", "/projects", "/thank-you"]);

function merge(): RouteDef[] {
  const map = new Map<string, RouteDef>();
  for (const r of fixedRoutes) map.set(r.path, r);
  for (const r of [...serviceRoutes, ...guideRoutes, ...projectRoutes]) {
    if (map.has(r.path) && KEEP_FIXED.has(r.path)) continue;
    map.set(r.path, r);
  }
  return [...map.values()];
}

export const routes: RouteDef[] = merge();

/** Routes that belong in sitemap.xml. */
export const sitemapRoutes = (): RouteDef[] => routes.filter((r) => r.sitemap !== false && !r.meta.noindex);
