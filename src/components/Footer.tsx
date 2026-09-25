import { Link } from "react-router-dom";
import { Facebook, Instagram, Star } from "lucide-react";
import { company, contacts } from "@/data/site";

const linkClass = "hover:text-[#d4af37] transition-colors";

const Footer = () => (
  <footer className="bg-[#0a2e2a] text-white py-16 border-t border-white/10">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <img loading="lazy" decoding="async" src="/assets/mf-logo-DQmhj-jT.jpg" alt="MF Project Solutions" className="h-16 mb-4" />
          <p className="text-sm opacity-80 mb-4">
            Design and build for garden rooms, extensions and renovations across Dublin, Meath,
            Louth, Kildare and Wicklow.
          </p>
          <p className="text-sm opacity-80">{company.address}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li>
              <span className="block text-xs opacity-70">Construction enquiries</span>
              <a href={contacts.construction.tel} className={linkClass}>{contacts.construction.display}</a>
              {" · "}
              <a href={`mailto:${contacts.construction.email}`} className={linkClass}>
                {contacts.construction.email}
              </a>
            </li>
            <li>
              <span className="block text-xs opacity-70">Snagging enquiries (Wanessa)</span>
              <a href={contacts.snagging.tel} className={linkClass}>{contacts.snagging.display}</a>
            </li>
            <li>
              <span className="block text-xs opacity-70">Alex, Managing Director</span>
              <a href={contacts.alex.tel} className={linkClass}>{contacts.alex.display}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/about" className={linkClass}>About us</Link></li>
            <li><Link to="/garden-rooms" className={linkClass}>Garden rooms</Link></li>
            <li><Link to="/granny-flats" className={linkClass}>Granny flats</Link></li>
            <li><Link to="/home-extensions" className={linkClass}>Home extensions</Link></li>
            <li><Link to="/interior-design" className={linkClass}>Refurbishments &amp; fit outs</Link></li>
            <li><Link to="/projects" className={linkClass}>Projects</Link></li>
            <li><Link to="/snagging" className={linkClass}>Snagging inspections</Link></li>
            <li><Link to="/faqs" className={linkClass}>FAQs</Link></li>
            <li><a href="#contact" className={linkClass}>Contact us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Follow us</h4>
          <div className="flex gap-4 mb-6">
            <a href={company.facebook} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href={company.instagram} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label="Instagram">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
          <a
            href={company.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm opacity-80 ${linkClass}`}
          >
            <Star className="w-4 h-4" /> Leave us a review on Google
          </a>
        </div>
      </div>

      <div className="border-t border-white/20 pt-8 text-center text-sm opacity-80 space-y-1">
        <p>© {new Date().getFullYear()} MF Project Solutions. All rights reserved.</p>
        <p className="text-xs">
          {company.legalName}, trading as MF Project Solutions. Company Reg. {company.companyReg}.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
