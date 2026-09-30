import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { settings } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import type { LeadRoute } from "@/lib/types";

const choices: { route: LeadRoute; label: string; hint: string }[] = [
  { route: "major", label: "A larger project", hint: "Extensions, renovations, garden homes, commercial, design, pricing from drawings" },
  { route: "small", label: "A smaller job", hint: "Bathrooms, garden rooms, patios, landscaping, verandas, kitchens, joinery" },
  { route: "property", label: "A property inspection", hint: "Snagging, re-snagging, pre-purchase inspections" },
];

type Props = {
  title: string;
  text: string;
  pageCode: string;
  /** Start on this route; the visitor can switch unless locked. */
  initial?: LeadRoute;
  lock?: boolean;
  id?: string;
};

/**
 * Contact section for pages that serve more than one kind of visitor. The visitor picks what it
 * is about in plain words; that choice decides who receives the enquiry. Nobody has to know how
 * MF is organised to get in touch.
 */
export default function ContactBlock({ title, text, pageCode, initial = "major", lock = false, id = "contact" }: Props) {
  const [route, setRoute] = useState<LeadRoute>(initial);
  const r = settings.routes[route];
  return (
    <section id={id} className="scroll-mt-20 bg-ink py-20 text-white">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="eyebrow mb-3 text-tan">Contact</div>
          <h2 className="text-3xl leading-tight md:text-[2.6rem]">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">{text}</p>
          <div className="mt-10 space-y-6">
            {(["major", "small", "property"] as const).map((k) => {
              const x = settings.routes[k];
              return (
                <div key={k} className={`border-l-2 pl-4 ${k === route ? "border-tan" : "border-white/15"}`}>
                  <div className="text-xs uppercase tracking-wider text-white/55">{x.label}</div>
                  <div className="mt-1 font-semibold">{x.person}</div>
                  <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
                    <a href={x.tel} data-route={k} data-page={pageCode} className="flex items-center gap-2 text-white/85 hover:text-tan">
                      <Phone className="h-4 w-4 text-tan" aria-hidden="true" /> {x.phone}
                    </a>
                    <a href={waLink(k, pageCode)} target="_blank" rel="noreferrer" data-route={k} data-page={pageCode} className="flex items-center gap-2 text-white/85 hover:text-tan">
                      <MessageCircle className="h-4 w-4 text-tan" aria-hidden="true" /> WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
            <p className="text-sm text-white/55">We work {settings.serviceArea.summary}.</p>
          </div>
        </div>
        <div className="rounded-xl bg-white/[0.04] p-5 ring-1 ring-white/10 sm:p-8">
          {!lock && (
            <fieldset className="mb-6">
              <legend className="mb-3 text-sm font-medium text-white">What is it about?</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {choices.map((c) => (
                  <button
                    key={c.route}
                    type="button"
                    onClick={() => setRoute(c.route)}
                    aria-pressed={route === c.route}
                    className={`rounded-md border px-3 py-3 text-left text-sm transition-colors ${
                      route === c.route ? "border-tan bg-tan text-ink" : "border-white/25 text-white hover:border-white/60"
                    }`}
                  >
                    <span className="block font-semibold">{c.label}</span>
                    <span className={`mt-0.5 block text-xs leading-snug ${route === c.route ? "text-ink/75" : "text-white/60"}`}>{c.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          <p className="mb-5 text-sm text-white/70">
            This goes to <span className="font-semibold text-white">{r.person}</span>.
          </p>
          <EnquiryForm key={route} route={route} pageCode={pageCode} tone="dark" />
        </div>
      </div>
    </section>
  );
}
