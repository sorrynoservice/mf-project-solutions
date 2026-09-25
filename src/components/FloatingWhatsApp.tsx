import { useLocation } from "react-router-dom";

import { contacts } from "@/data/site";

/** The calculator's sticky estimate bar occupies the same corner on mobile. */
const HIDDEN_ON = ["/garden-calculator"];

const FloatingWhatsApp = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";

  if (HIDDEN_ON.includes(path)) return null;

  return (
    <a
      href={path === "/snagging" ? contacts.snagging.whatsapp : contacts.construction.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 block h-14 w-14 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <img
        src="/whatsapp.png"
        alt=""
        width={56}
        height={56}
        className="h-full w-full rounded-full"
      />
      <span className="sr-only">Chat with us on WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsApp;
