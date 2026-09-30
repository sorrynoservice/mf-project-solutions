import { useEffect, useRef, useState } from "react";
import { Link, NavLink as RLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { commercialLinks, propertyLinks, residentialMain, residentialOther, type NavLink } from "@/components/site/nav";
import { usePage } from "@/components/site/PageContext";
import { settings } from "@/lib/content";

type Menu = { label: string; to: string; groups: { title?: string; links: NavLink[] }[] };

const menus: Menu[] = [
  { label: "Residential", to: "/residential", groups: [{ links: [{ name: "All residential work", to: "/residential" }, ...residentialMain] }, { title: "Other residential work", links: residentialOther }] },
  { label: "Commercial", to: "/commercial", groups: [{ links: commercialLinks }] },
];
const flat: NavLink[] = [
  { name: "Design", to: "/design" },
  { name: "Projects", to: "/projects" },
];
const property: Menu = { label: "Property services", to: "/property-services", groups: [{ links: propertyLinks }] };
const after: NavLink[] = [{ name: "About", to: "/about" }];

function Dropdown({ m, light, onNavigate }: { m: Menu; light: boolean; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wide = m.groups.length > 1;
  return (
    <div
      className="relative"
      onMouseEnter={() => { if (t.current) clearTimeout(t.current); setOpen(true); }}
      onMouseLeave={() => { t.current = setTimeout(() => setOpen(false), 180); }}
    >
      <button
        type="button"
        className={`flex items-center gap-1 whitespace-nowrap py-2 text-[15px] font-medium transition-colors ${light ? "text-white hover:text-tan" : "text-ink hover:text-tan-deep"}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {m.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
          <div className={`rounded-lg border border-border bg-white p-2 shadow-luxury ${wide ? "grid w-[34rem] grid-cols-2 gap-2" : "w-72"}`}>
            {m.groups.map((g, gi) => (
              <div key={gi} className={gi > 0 ? "rounded-md bg-paper p-1" : ""}>
                {g.title && <div className="eyebrow px-3 pb-1 pt-2 text-tan-deep">{g.title}</div>}
                {g.links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => { setOpen(false); onNavigate(); }}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-paper"
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** Site header. "overlay" sits transparent over a full-bleed hero until the page scrolls. */
export default function Header({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const page = usePage();
  const r = settings.routes?.[page.route] ?? settings.routes?.major;

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const light = variant === "overlay" && !scrolled && !open;
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap py-2 text-[15px] font-medium transition-colors ${light ? "text-white hover:text-tan" : "text-ink hover:text-tan-deep"} ${isActive ? (light ? "text-tan" : "text-tan-deep") : ""}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        light ? "bg-gradient-to-b from-black/55 to-transparent" : "bg-white/95 backdrop-blur border-b border-border"
      }`}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-6">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="MF Project Solutions, home">
          <img src="/assets/mf-logo-DQmhj-jT.jpg" alt="" width={44} height={40} className="h-10 w-11 rounded-sm object-cover" />
          <span className={`hidden font-serif text-lg leading-none sm:block ${light ? "text-white" : "text-ink"}`}>
            MF Project Solutions
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
          {menus.map((m) => (
            <Dropdown key={m.label} m={m} light={light} onNavigate={() => undefined} />
          ))}
          {flat.map((l) => (
            <RLink key={l.to} to={l.to} className={linkCls}>
              {l.name}
            </RLink>
          ))}
          <Dropdown m={property} light={light} onNavigate={() => undefined} />
          {after.map((l) => (
            <RLink key={l.to} to={l.to} className={linkCls}>
              {l.name}
            </RLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          {r && (
            <a href={r.tel} data-route={page.route} data-page={page.pageCode} className={`hidden items-center gap-2 whitespace-nowrap text-sm font-semibold 2xl:flex ${light ? "text-white" : "text-ink"}`}>
              <Phone className="h-4 w-4" aria-hidden="true" /> {r.phone}
            </a>
          )}
          <Link to={page.contactHref} className={`whitespace-nowrap ${light ? "btn-tan h-10 px-5 text-sm" : "btn-ink h-10 px-5 text-sm"}`}>
            {page.ctaShort}
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((o) => !o)} className={`xl:hidden ${light ? "text-white" : "text-ink"}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <nav className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-border bg-white xl:hidden" aria-label="Mobile">
          <div className="wrap space-y-6 py-6">
            {[
              { title: "Residential", links: [{ name: "All residential work", to: "/residential" }, ...residentialMain] },
              { title: "Other residential work", links: residentialOther },
              { title: "Commercial", links: commercialLinks },
              { title: "Property services", links: propertyLinks },
              { title: "More", links: [...flat, { name: "About", to: "/about" }, { name: "Contact", to: "/contact" }] },
            ].map((g) => (
              <div key={g.title}>
                <div className="eyebrow mb-2 text-tan-deep">{g.title}</div>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {g.links.map((l) => (
                    <Link key={l.to} to={l.to} className="rounded-md py-2 text-[17px] text-ink">
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
