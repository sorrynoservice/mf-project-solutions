import { createContext, useContext } from "react";
import type { LeadRoute } from "@/lib/types";

export type PageInfo = {
  /** Which person and inbox leads from this page go to. */
  route: LeadRoute;
  /** Short page code carried into WhatsApp messages and lead records. */
  pageCode: string;
  /** Service name used in WhatsApp messages and the form. */
  service: string;
  /** Where the header and mobile bar "enquire" buttons point: the page's own form, or /contact. */
  contactHref: string;
  ctaShort: string;
};

export const defaultPage: PageInfo = {
  route: "major",
  pageCode: "WEB",
  service: "a project",
  contactHref: "/contact",
  ctaShort: "Discuss a project",
};

export const PageContext = createContext<PageInfo>(defaultPage);
export const usePage = () => useContext(PageContext);
