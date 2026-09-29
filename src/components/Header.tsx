import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

export type HeaderVariant = "home" | "light" | "dark";

export const residentialLinks = [
  { name: "All residential work", path: "/residential" },
  { name: "Whole-house renovations", path: "/residential/whole-house-renovations" },
  { name: "Extensions and attic conversions", path: "/residential/extensions" },
  { name: "Kitchens and bathrooms", path: "/residential/kitchens-bathrooms" },
  { name: "Bespoke joinery", path: "/residential/bespoke-joinery" },
  { name: "Garden buildings and garden dwellings", path: "/residential/garden-buildings" },
];

const mainLinks = [
  { name: "Commercial", path: "/commercial" },
  { name: "Interior design", path: "/interior-design" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  { name: "How we work", path: "/how-we-work" },
  { name: "About", path: "/about" },
];

const Header = ({ variant = "dark" }: { variant?: HeaderVariant }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (variant !== "home") {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const solid = scrolled || mobileOpen;
  const bgClass =
    variant === "light"
      ? "bg-[#d4af37]/90 backdrop-blur-md border-b border-[#0a2e2a]/10"
      : solid
        ? "bg-[#0a2e2a]/95 backdrop-blur-sm border-b border-white/10"
        : "bg-gradient-to-b from-black/50 to-transparent";

  const textClass = variant === "light" ? "text-[#0a2e2a]" : "text-white";
  const hoverClass = variant === "light" ? "hover:text-[#0a2e2a]" : "hover:text-[#d4af37]";
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${textClass} ${hoverClass} transition-colors font-medium text-[15px] ${isActive ? "text-[#d4af37]" : ""}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center gap-6">
          <Link to="/" className="shrink-0">
            <img src="/assets/mf-logo-DQmhj-jT.jpg" alt="MF Project Solutions" className="h-12" />
          </Link>

          <nav className="hidden xl:flex items-center gap-7" aria-label="Main">
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                setResOpen(true);
              }}
              onMouseLeave={() => {
                closeTimer.current = setTimeout(() => setResOpen(false), 250);
              }}
            >
              <button
                className={`${textClass} ${hoverClass} transition-colors font-medium text-[15px] flex items-center gap-1`}
                aria-expanded={resOpen}
                onClick={() => setResOpen((o) => !o)}
              >
                Residential
                <ChevronDown className={`w-4 h-4 transition-transform ${resOpen ? "rotate-180" : ""}`} />
              </button>
              {resOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                    {residentialLinks.map((l) => (
                      <Link
                        key={l.path}
                        to={l.path}
                        onClick={() => setResOpen(false)}
                        className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#0a2e2a] transition-colors text-sm font-medium border-b border-gray-100 last:border-b-0"
                      >
                        {l.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {mainLinks.map((l) => (
              <NavLink key={l.path} to={l.path} className={linkClass}>
                {l.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-5">
            <Link to="/snagging" className={`${textClass} ${hoverClass} text-sm opacity-80`}>
              Property inspections
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center h-10 rounded-lg px-5 text-sm font-semibold bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90 transition-colors"
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`xl:hidden ${textClass}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="xl:hidden mt-4 pb-6 space-y-4 max-h-[80vh] overflow-y-auto" aria-label="Mobile">
            <div className="space-y-2">
              <div className={`${textClass} font-semibold`}>Residential</div>
              {residentialLinks.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block pl-4 ${textClass} opacity-85 ${hoverClass} text-sm`}
                >
                  {l.name}
                </Link>
              ))}
            </div>
            {mainLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setMobileOpen(false)}
                className={`block ${textClass} ${hoverClass} font-medium`}
              >
                {l.name}
              </Link>
            ))}
            <Link to="/snagging" onClick={() => setMobileOpen(false)} className={`block ${textClass} ${hoverClass} font-medium`}>
              Property inspections
            </Link>
            <Link to="/faqs" onClick={() => setMobileOpen(false)} className={`block ${textClass} ${hoverClass} font-medium`}>
              FAQs
            </Link>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center h-11 rounded-lg px-6 text-sm font-semibold bg-[#d4af37] text-[#0a2e2a]"
            >
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
