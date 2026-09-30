/**
 * Route registry. One entry per page: the element, its head meta, and whether it goes in the
 * sitemap. App.tsx renders these routes, scripts/prerender.mjs writes a static HTML file for
 * each, and the sitemap is built from them.
 *
 * To give a page its real design, swap the placeholder element here. Meta for content pages
 * (services, guides, projects) comes from the JSON in /content.
 */
import type { ReactNode } from "react";
import { guides, isPreview, projects, services } from "@/lib/content";
import { SITE_URL, SITE_NAME } from "@/lib/head";
import type { MediaItem } from "@/lib/types";
import GardenCalculator from "@/pages/GardenCalculator";
import Home from "@/pages/Home";
import Residential from "@/pages/Residential";
import Commercial from "@/pages/Commercial";
import About from "@/pages/About";
import ForArchitects from "@/pages/ForArchitects";
import PropertyServices from "@/pages/PropertyServices";
import ServiceLanding from "@/pages/ServiceLanding";
import Guide from "@/pages/Guide";
import { ProjectDetail, Projects } from "@/pages/Projects";
import { Contact, Cookies, Faqs, HowWeWork, Privacy, ThankYou } from "@/pages/Simple";

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
/** Adds the brand only when the whole title still fits in search results (about 62 characters). */
const withSuffix = (t: string) => (t.includes(SITE_NAME) || (t + suffix).length > 62 ? t : t + suffix);

/** Meta descriptions between roughly 70 and 160 characters, cut at a word boundary. */
const clampDesc = (d: string, fallback = "") => {
  let out = d.trim();
  if (out.length < 70 && fallback) out = `${out} ${fallback}`.trim();
  if (out.length <= 160) return out;
  const cut = out.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "")}...`;
};

/** og:image from a content image: the original JPEG (link previews handle JPEG more reliably than WebP). */
const ogFrom = (m?: MediaItem): string | undefined => m?.image || undefined;

/** "Title, Area" unless the title already names the area. */
const projectTitle = (title: string, location?: string) => {
  const parts = (location ?? "").split(",").map((x) => x.trim()).filter(Boolean);
  const t = title.toLowerCase();
  if (!parts.length || parts.some((x) => t.includes(x.toLowerCase())) || /founder|area/i.test(location ?? "")) return title;
  return `${title}, ${parts[0]}`;
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

const page = (
  path: string,
  element: ReactNode,
  title: string,
  description: string,
  extra: Omit<Partial<RouteDef>, "meta"> & { meta?: Partial<RouteMeta> } = {},
): RouteDef => {
  const { meta, ...rest } = extra;
  return {
    path,
    element,
    priority: path === "/" ? 1 : 0.7,
    ...rest,
    meta: { title: withSuffix(title), description, ...meta },
  };
};

const org = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: SITE_NAME,
  legalName: "MF Engineering and Designs Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/mf-logo-DQmhj-jT.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: "+353838097035",
  email: "info@mfeng.ie",
  foundingDate: "2021",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 1, Merrywell Business Park",
    addressLocality: "Drumree",
    addressRegion: "Co. Meath",
    postalCode: "A85 EC84",
    addressCountry: "IE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.5126, longitude: -6.5403 },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 53.5126, longitude: -6.5403 },
    geoRadius: "50000",
    description: "Within 50 km of Dunshaughlin, Co. Meath, including all of Dublin",
  },
  sameAs: ["https://www.facebook.com/profile.php?id=61566828341610", "https://www.instagram.com/mfprojectsolutions/"],
};

const fixedRoutes: RouteDef[] = [
  page(
    "/",
    <Home />,
    "Extensions and Renovations in Dublin and Meath",
    "Family-run construction company building extensions, whole-house renovations and commercial fit-outs across Dublin, Meath and Kildare, with our own joinery workshop.",
    { meta: { jsonLd: [org] } },
  ),
  page(
    "/residential",
    <Residential />,
    "Home Extensions and Renovations in Dublin and Meath",
    "Extensions, whole-house renovations, attic conversions, garden homes, kitchens and joinery, built from your architect's drawings or designed with you first.",
    { priority: 0.9 },
  ),
  page(
    "/commercial",
    <Commercial />,
    "Commercial Fit-Outs in Dublin: Restaurants, Clinics, Retail",
    "Design, construction and joinery for restaurants, clinics, retail units and offices, programmed around your opening date and closed out with your design team.",
    { priority: 0.9 },
  ),
  page("/about", <About />, "About Us: A Family-Run Construction Company", "MF Project Solutions is a family-run construction company in Drumree, Co. Meath, with its own site crew and joinery workshop. Meet the people who run it."),
  page("/for-architects", <ForArchitects />, "For Architects and Designers: Building Your Design", "A main contractor that prices your tender package, builds to your drawings with its own crew and joiners, and closes out with your design team. Send tender drawings."),
  page("/property-services", <PropertyServices />, "Snagging and Pre-Purchase Inspections in Dublin", "Snag inspections for new homes and pre-purchase property inspections, led by Wanessa, with a clear photo report you can act on. Dublin, Meath and Kildare."),
  page("/projects", <Projects />, "Projects: Extensions, Renovations and Fit-Outs", "Homes and commercial units built by MF Project Solutions, shown from before to handover, with our role stated and architects credited.", { priority: 0.9 }),
  page("/contact", <Contact />, "Contact MF Project Solutions", "Call, WhatsApp or send an enquiry. Choose what it is about and it goes straight to the right person. Dublin, Meath, Kildare and Louth."),
  page("/how-we-work", <HowWeWork />, "How We Work: From Site Visit to Handover", "How a project runs with MF Project Solutions: site visit, detailed written quotation, programme, the build and handover."),
  page("/faqs", <Faqs />, "Frequently Asked Questions", "Answers to common questions about quotations, areas we cover, planning, Building Regulations and snag inspections."),
  page("/garden-calculator", <GardenCalculator />, "Garden Renovation Price Calculator", "Build an instant indicative estimate for patios, artificial grass, planting beds, drainage and garden structures.", { priority: 0.6 }),
  page("/privacy", <Privacy />, "Privacy Policy", "How MF Project Solutions collects, uses and protects personal data.", { priority: 0.2 }),
  page("/cookies", <Cookies />, "Cookie Policy", "The cookies this website uses and how to change your choices.", { priority: 0.2 }),
  page("/thank-you", <ThankYou />, "Thank You", "Thanks for getting in touch.", { meta: { noindex: true }, sitemap: false }),
];

const serviceRoutes: RouteDef[] = services.filter((s) => !s.hidden || isPreview).map((s) => ({
  path: s.route,
  element: <ServiceLanding route={s.route} />,
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
  element: <Guide route={g.route} />,
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
  element: <ProjectDetail slug={p.slug} />,
  meta: {
    title: withSuffix(projectTitle(p.title, p.location)),
    description: clampDesc(p.summary ?? "", `Photos and project details from MF Project Solutions.`),
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
