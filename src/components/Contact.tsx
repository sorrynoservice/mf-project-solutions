import { CalendarDays, Mail, MessageCircle, Phone } from "lucide-react";

const cardClass = "rounded-2xl border border-white/20 shadow-luxury p-6 bg-white/5 backdrop-blur";
const cardTitleClass = "flex items-center gap-2 text-white font-semibold mb-4";
const outlineButtonClass =
  "gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border h-11 px-6 py-2 w-full flex items-center justify-between bg-white/10 text-white border-white/20 hover:bg-white/20";
const emailButtonClass =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border h-11 px-6 py-2 w-full text-sm bg-white/10 text-white border-white/20 hover:bg-white/20";

const Contact = () => (
  <section id="contact" className="py-20 bg-[#0a2e2a]">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-white">Book or ask a question</h2>
        <p className="text-lg text-[#d4af37]">We're here to help you with your project</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className={cardClass}>
          <div className={cardTitleClass}>
            <MessageCircle className="w-5 h-5 text-[#d4af37]" /> Fastest response
          </div>
          <a href="https://wa.me/353838014857" target="_blank" rel="noreferrer">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-soft hover:shadow-luxury h-14 rounded-lg px-10 text-base w-full mb-3 bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90">
              WhatsApp Wanessa <MessageCircle className="w-4 h-4" />
            </button>
          </a>
          <div className="text-xs text-white/70">
            She coordinates times and access (EN or PT-BR)
          </div>
        </div>

        <div className={cardClass}>
          <div className={cardTitleClass}>
            <CalendarDays className="w-5 h-5 text-[#d4af37]" /> Book online
          </div>
          <a href="https://forms.gle/pV5qTNMyJ5j4Xyt3A" target="_blank" rel="noreferrer">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border h-14 rounded-lg px-10 text-base w-full mb-3 bg-white/10 text-white border-white/20 hover:bg-white/20">
              Open booking form <CalendarDays className="w-4 h-4" />
            </button>
          </a>
          <div className="text-xs text-white/70">Get confirmation by email with next steps</div>
        </div>

        <div className={cardClass}>
          <div className={cardTitleClass}>
            <Phone className="w-5 h-5 text-[#d4af37]" /> Call us
          </div>
          <div className="space-y-2">
            <a href="tel:+353838014857">
              <button className={outlineButtonClass}>
                <span>+353 83 801 4857</span>
                <span className="text-xs text-white/70">Wanessa</span>
              </button>
            </a>
            <a href="tel:+353876039378">
              <button className={outlineButtonClass}>
                <span>+353 87 603 9378</span>
                <span className="text-xs text-white/70">Alex</span>
              </button>
            </a>
          </div>
        </div>

        <div className={cardClass}>
          <div className={cardTitleClass}>
            <Mail className="w-5 h-5 text-[#d4af37]" /> Email
          </div>
          <div className="space-y-2">
            <a href="mailto:wcorrea@mfeng.ie">
              <button className={emailButtonClass}>wcorrea@mfeng.ie</button>
            </a>
            <a href="mailto:aferreira@mfeng.ie">
              <button className={emailButtonClass}>aferreira@mfeng.ie</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
