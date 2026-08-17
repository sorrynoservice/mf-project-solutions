import { Link, useNavigate } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const goToContact = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const goToAbout = () => navigate("/about");

  return (
    <footer className="bg-[#0a2e2a] text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img src="/assets/mf-logo-DQmhj-jT.jpg" alt="MF Project Solutions" className="h-16 mb-4" />
            <p className="text-sm opacity-80 mb-4">
              Get in touch, we really want you to know our work, we are waiting for you!
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow us</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61566828341610"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/mfprojectsolutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <button onClick={goToAbout} className="hover:text-[#d4af37] transition-colors">
                  About us
                </button>
              </li>
              <li>
                <button onClick={goToContact} className="hover:text-[#d4af37] transition-colors">
                  Contact us
                </button>
              </li>
              <li>
                <Link to="/snagging" className="hover:text-[#d4af37] transition-colors">
                  Snagging Services
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm opacity-80">
          <p>Copyright© 2024 Project Solutions, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
