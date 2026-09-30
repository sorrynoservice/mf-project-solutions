import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { CookieSettingsLink } from "@/components/ConsentBanner";
import { commercialLinks, propertyLinks, residentialMain, residentialOther } from "@/components/site/nav";
import { GoogleBadge } from "@/components/ui/Blocks";
import { settings } from "@/lib/content";

export default function Footer() {
  const c = settings.company;
  const routes = settings.routes;
  const col = (title: string, links: { name: string; to: string }[]) => (
    <div>
      <div className="eyebrow mb-4 text-tan">{title}</div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-[15px] text-white/75 hover:text-white">
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="bg-ink-3 pb-24 pt-16 text-white md:pb-12">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src="/assets/mf-logo-DQmhj-jT.jpg" alt="" width={48} height={44} className="h-11 w-12 rounded-sm object-cover" loading="lazy" />
              <span className="font-serif text-xl">MF Project Solutions</span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
              Family-run construction company building extensions, renovations and commercial fit-outs across Dublin, Meath and Kildare, with our own joinery workshop in Drumree.
            </p>
            <div className="mt-5">
              <GoogleBadge tone="dark" />
            </div>
            <div className="mt-8 space-y-4 text-[15px]">
              {routes &&
                (["major", "small", "property"] as const).map((k) => (
                  <div key={k}>
                    <div className="text-white/55 text-xs uppercase tracking-wider">{routes[k].label}</div>
                    <a href={routes[k].tel} data-route={k} className="mt-1 flex items-center gap-2 text-white hover:text-tan">
                      <Phone className="h-4 w-4 text-tan" aria-hidden="true" /> {routes[k].phone}
                      <span className="text-white/55">({routes[k].person})</span>
                    </a>
                  </div>
                ))}
              {routes && (
                <a href={`mailto:${routes.small.email}`} className="flex items-center gap-2 text-white/80 hover:text-white">
                  <Mail className="h-4 w-4 text-tan" aria-hidden="true" /> {routes.small.email}
                </a>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {col("Residential", residentialMain)}
            {col("Other work", residentialOther)}
            {col("Commercial", commercialLinks)}
            {col("Company", [
              ...propertyLinks.slice(1),
              { name: "Design", to: "/design" },
              { name: "Projects", to: "/projects" },
              { name: "About us", to: "/about" },
              { name: "How we work", to: "/how-we-work" },
              { name: "FAQs", to: "/faqs" },
              { name: "Garden calculator", to: "/garden-calculator" },
              { name: "Contact", to: "/contact" },
            ])}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tan" aria-hidden="true" />
              {c?.address}
            </p>
            <p>
              {c?.legalName}, trading as {c?.name}. Registered in Ireland, company no. {c?.companyReg}. VAT {c?.vat}.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
            <CookieSettingsLink className="hover:text-white" />
            {c?.instagram && (
              <a href={c.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {c?.facebook && (
              <a href={c.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
