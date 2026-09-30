/**
 * Content model. Every page is built from JSON files in /content, edited through Pages CMS
 * (config in /.pages.yml) or directly in the repo. Nothing here is hard-coded into page code.
 *
 * Image fields hold a path under /public, e.g. "/assets/work/phibsborough-kitchen-87.jpg".
 * The build (scripts/build-images.mjs) reads every image once and writes sized WebP copies
 * plus src/generated/images.json (width, height, variants), so any uploaded photo is
 * served at the right size automatically.
 */

/** How an image may be presented. Anything that is not a photograph is labelled on the page. */
export type ImageKind = "photo" | "design" | "drawing" | "ai-enhanced";

export type MediaItem = {
  image: string;
  /** Short caption, also used as alt text when alt is empty. */
  caption?: string;
  alt?: string;
  kind?: ImageKind;
  /** Focal point for cropping, CSS object-position, e.g. "50% 40%". */
  focus?: string;
};

export type VideoItem = {
  /** Path to an MP4 under /public (short, silent, web-compressed) or a YouTube URL. */
  src: string;
  poster: string;
  caption?: string;
  /** Silent loops may autoplay on desktop; walkthroughs are click to play. */
  loop?: boolean;
};

/** Which person and inbox a lead goes to. */
export type LeadRoute = "property" | "small" | "major";

export type Engine = "cash-flow" | "pipeline" | "both" | "seasonal" | "organic";

export type Review = {
  /** File name without .json */
  id: string;
  name: string;
  /** ISO date of the Google review. */
  date: string;
  rating?: number;
  /** Exactly as written on Google (or the English translation, if translated is true). */
  text: string;
  /** True when the original is in another language and text is a translation. */
  translated?: boolean;
  category: "snagging" | "pre-purchase" | "construction";
  /** Service tags, e.g. "bathroom", "garden-room", "landscaping", "extension", "renovation". */
  services: string[];
  people?: string[];
  /** Short line pulled from the text for cards (must be a verbatim excerpt). */
  highlight?: string;
  /** Hidden from the site while false (e.g. full text not yet copied from Google). */
  show: boolean;
  pending?: string;
};

export type Person = {
  id: string;
  name: string;
  role: string;
  headshot: string;
  bio: string[];
  /** Contact route shown on the card. */
  route?: LeadRoute | "none";
  order: number;
  show: boolean;
  /** Set while something about this entry awaits confirmation. Pending entries render only on the preview, marked. */
  pending?: string;
};

export type ProjectStageKey =
  | "existing"
  | "design"
  | "construction"
  | "technical"
  | "services"
  | "finishes"
  | "completed";

export type ProjectStage = {
  stage: ProjectStageKey;
  title?: string;
  text?: string;
  images: MediaItem[];
  videos?: VideoItem[];
};

export type Project = {
  slug: string;
  title: string;
  /** Area only, never a client's address. */
  location: string;
  year?: string;
  sector: "residential" | "commercial";
  /** Category tags used to place the project on service pages and filters. */
  categories: string[];
  /** One of the approved role phrases, stated exactly. */
  role: string;
  architect?: string;
  summary: string;
  intro?: string[];
  scope?: string[];
  hero: MediaItem;
  heroMobile?: MediaItem;
  gallery: MediaItem[];
  before?: MediaItem[];
  after?: MediaItem[];
  /** Design image beside the finished result. */
  pairs?: { a: MediaItem; b: MediaItem; caption: string; type: "design-built" | "before-after" }[];
  stages?: ProjectStage[];
  videos?: VideoItem[];
  reviews?: string[];
  /** Flagships get the full story layout and appear first. */
  flagship?: boolean;
  featured?: boolean;
  /** Lower comes first. */
  order?: number;
  designNote?: string;
  published: boolean;
  pending?: string;
};

export type PriceGuide = {
  headline: string;
  note?: string;
  /** Unconfirmed prices never render in production; the preview shows them marked. */
  confirmed: boolean;
  table?: { label: string; value: string }[];
};

export type ServicePage = {
  slug: string;
  route: string;
  /** Menu and breadcrumb name. */
  name: string;
  /** Short code carried into WhatsApp messages and lead records, e.g. "BTH". */
  pageCode: string;
  leadRoute: LeadRoute;
  engine: Engine;
  /** Which service a form pre-selects. */
  formService: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    image: MediaItem;
    imageMobile?: MediaItem;
    ctaLabel: string;
    /** Up to three short trust points under the hero, verifiable facts only. */
    bullets?: string[];
  };
  proof: { title: string; text: string }[];
  intro?: { title: string; paragraphs: string[] };
  gallery: { title: string; intro?: string; items: MediaItem[] };
  pairs?: { a: MediaItem; b: MediaItem; caption: string; type: "design-built" | "before-after" }[];
  video?: VideoItem & { title?: string };
  included?: { title: string; items: string[]; priceFactors?: string[] };
  price?: PriceGuide;
  process?: { title: string; text: string }[];
  /** Review ids, in display order. */
  reviews?: string[];
  faqs?: { q: string; a: string }[];
  /** Project category tag to pull related project cards. */
  projectsTag?: string;
  crossSell?: { route: string; label: string; text: string }[];
  cta: { title: string; text: string };
  /** Extra free-form sections (rules explained, sizes, etc.). */
  sections?: { title: string; paragraphs?: string[]; bullets?: string[]; image?: MediaItem }[];
  /** Which form the page uses. */
  form?: "enquiry" | "snag-booking";
  /** Hidden pages build but are left out of menus, sitemap and search (e.g. BER before registration). */
  hidden?: boolean;
};

export type Guide = {
  slug: string;
  route: string;
  title: string;
  seo: { title: string; description: string };
  lead: string;
  hero?: MediaItem;
  updated: string;
  sections: { title: string; paragraphs?: string[]; bullets?: string[] }[];
  related?: { route: string; label: string }[];
  leadRoute: LeadRoute;
  pageCode: string;
};

export type Settings = {
  company: {
    name: string;
    legalName: string;
    companyReg: string;
    vat: string;
    established: number;
    address: string;
    eircode: string;
    reviewUrl: string;
    facebook: string;
    instagram: string;
    linkedin?: string;
    youtube?: string;
  };
  routes: Record<LeadRoute, { label: string; person: string; phone: string; tel: string; whatsapp: string; email: string }>;
  serviceArea: { centre: string; radiusKm: number; summary: string };
  web3formsKey: string;
  /** Google Apps Script web app URL that logs leads to the Master Control sheet. Empty = off. */
  leadSheetUrl: string;
  /** Finance (Humm) block. Stays off until approved. */
  finance: { enabled: boolean; text: string };
  instagramStrip: MediaItem[];
};
