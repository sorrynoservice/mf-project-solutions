import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

export type HeaderVariant = "home" | "light" | "dark";

const serviceLinks = [
  { name: "Garden Rooms", path: "/garden-rooms" },
  { name: "Granny Flats", path: "/granny-flats" },
  { name: "Home Extensions", path: "/home-extensions" },
  { name: "Bathroom Renovations", path: "/bathroom-renovations" },
  { name: "Landscaping & Pergolas", path: "/landscaping-pergolas" },
  { name: "Kitchen Renovations", path: "/kitchen-renovations" },
  { name: "Interior Design", path: "/interior-design" },
  { name: "Snagging", path: "/snagging" },
  { name: "Garden Calculator", path: "/garden-calculator" },
];

const Header = ({ variant = "dark" }: { variant?: HeaderVariant }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (variant !== "home") {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const bgClass =
    variant === "home"
      ? scrolled
        ? "bg-[#0a2e2a]/95 backdrop-blur-sm border-b border-white/10"
        : "bg-transparent"
      : variant === "light"
        ? "bg-[#d4af37]/90 backdrop-blur-md border-b border-[#0a2e2a]/10"
        : "bg-[#0a2e2a]/90 backdrop-blur-md border-b border-white/10";

  const textClass = variant === "light" ? "text-[#0a2e2a]" : "text-white";
  const hoverClass = variant === "light" ? "hover:text-[#0a2e2a]" : "hover:text-[#d4af37]";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/assets/mf-logo-DQmhj-jT.jpg" alt="MF Project Solutions" className="h-12" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`${textClass} ${hoverClass} transition-colors font-medium`}>
              Home
            </Link>
            <Link to="/about" className={`${textClass} ${hoverClass} transition-colors font-medium`}>
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimer.current) clearTimeout(closeTimer.current);
                setServicesOpen(true);
              }}
              onMouseLeave={() => {
                closeTimer.current = setTimeout(() => setServicesOpen(false), 300);
              }}
            >
              <button
                className={`${textClass} ${hoverClass} transition-colors font-medium flex items-center gap-1`}
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-64 bg-white rounded-lg shadow-2xl border border-gray-200">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() => setServicesOpen(false)}
                        className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#0a2e2a] transition-colors first:rounded-t-lg last:rounded-b-lg text-sm font-medium border-b border-gray-100 last:border-b-0"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/faqs" className={`${textClass} ${hoverClass} transition-colors font-medium`}>
              FAQs
            </Link>
            <a href="#contact" className={`${textClass} ${hoverClass} transition-colors font-medium`}>
              Contact
            </a>
          </nav>

          <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden ${textClass}`}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`block ${textClass} ${hoverClass} transition-colors font-medium`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className={`block ${textClass} ${hoverClass} transition-colors font-medium`}
            >
              About
            </Link>
            <div className="space-y-2">
              <div className={`${textClass} font-medium`}>Services</div>
              {serviceLinks.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block pl-4 ${textClass}/80 ${hoverClass} transition-colors text-sm`}
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link
              to="/faqs"
              onClick={() => setMobileOpen(false)}
              className={`block ${textClass} ${hoverClass} transition-colors font-medium`}
            >
              FAQs
            </Link>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className={`block ${textClass} ${hoverClass} transition-colors font-medium`}
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
