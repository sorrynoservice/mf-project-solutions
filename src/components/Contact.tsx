import { Link } from "react-router-dom";
import { ClipboardList, Mail, MessageCircle, Phone } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { contacts } from "@/data/site";

const cardClass = "rounded-2xl border border-white/20 shadow-luxury p-6 bg-white/5 backdrop-blur";
const cardTitleClass = "flex items-center gap-2 text-white font-semibold mb-4";
const outlineButtonClass =
  "gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 border h-11 px-4 py-2 w-full flex items-center justify-between bg-white/10 text-white border-white/20 hover:bg-white/20";

const Contact = () => (
  <section id="contact" className="py-20 bg-[#0a2e2a]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">Request a free site visit</h2>
        <p className="text-lg text-[#d4af37]">
          Tell us about your project and we'll arrange a visit and a written, itemised quote
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto [&>*]:min-w-0">
        <div className={`${cardClass} lg:col-span-2`}>
          <EnquiryForm tone="dark" />
        </div>

        <div className="space-y-6">
          <div className={cardClass}>
            <div className={cardTitleClass}>
              <MessageCircle className="w-5 h-5 text-[#d4af37]" /> Fastest response
            </div>
            <a href={contacts.construction.whatsapp} target="_blank" rel="noreferrer">
              <button className="inline-flex items-center justify-center gap-2 text-center font-medium transition-all duration-300 shadow-soft hover:shadow-luxury min-h-14 py-2 rounded-lg px-6 text-base w-full mb-3 bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90">
                WhatsApp us about your project <MessageCircle className="w-4 h-4" />
              </button>
            </a>
            <div className="text-xs text-white/70">English or Portuguese. Send photos of the space.</div>
          </div>

          <div className={cardClass}>
            <div className={cardTitleClass}>
              <Phone className="w-5 h-5 text-[#d4af37]" /> Call us
            </div>
            <div className="space-y-2">
              <a href={contacts.construction.tel}>
                <button className={outlineButtonClass}>
                  <span>{contacts.construction.display}</span>
                  <span className="text-xs text-white/70">Construction</span>
                </button>
              </a>
              <a href={contacts.alex.tel}>
                <button className={outlineButtonClass}>
                  <span>{contacts.alex.display}</span>
                  <span className="text-xs text-white/70">Alex</span>
                </button>
              </a>
            </div>
          </div>

          <div className={cardClass}>
            <div className={cardTitleClass}>
              <Mail className="w-5 h-5 text-[#d4af37]" /> Email
            </div>
            <a
              href={`mailto:${contacts.construction.email}`}
              className="text-white hover:text-[#d4af37] transition-colors"
            >
              {contacts.construction.email}
            </a>
          </div>

          <div className={cardClass}>
            <div className={cardTitleClass}>
              <ClipboardList className="w-5 h-5 text-[#d4af37]" /> Booking a snag inspection?
            </div>
            <Link to="/snagging" className="text-sm text-white/80 hover:text-[#d4af37] transition-colors">
              See snagging prices and book with Wanessa on {contacts.snagging.display}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
