import { MessageCircle, Phone, Send } from "lucide-react";
import { usePage } from "@/components/site/PageContext";
import { settings } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";

/** Sticky Call / WhatsApp / Enquire bar on phones. Numbers follow the page's lead route. */
export default function MobileBar() {
  const page = usePage();
  const r = settings.routes?.[page.route];
  if (!r) return null;
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[12px] font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
      <a href={r.tel} data-route={page.route} data-page={page.pageCode} className={`${item} text-ink`}>
        <Phone className="h-5 w-5" aria-hidden="true" /> Call
      </a>
      <a
        href={waLink(page.route, page.pageCode, page.service)}
        target="_blank"
        rel="noreferrer"
        data-route={page.route}
        data-page={page.pageCode}
        className={`${item} text-[#128c4a]`}
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
      </a>
      <a href={page.contactHref} className={`${item} bg-ink text-tan`}>
        <Send className="h-5 w-5" aria-hidden="true" /> {page.route === "property" ? "Book" : "Enquire"}
      </a>
    </div>
  );
}
