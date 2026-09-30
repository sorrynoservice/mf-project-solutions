import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import Layout from "@/components/site/Layout";
import PageHero from "@/components/ui/PageHero";
import EnquiryForm, { SERVICE_BY_CODE } from "@/components/forms/EnquiryForm";
import { guideByRoute, guides, settings } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";

const long = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${n[m - 1]} ${y}`;
};

export default function Guide({ route }: { route: string }) {
  const g = guideByRoute(route);
  if (!g) return null;
  const r = settings.routes[g.leadRoute];
  const service = SERVICE_BY_CODE[g.pageCode] || "a project";
  const others = guides.filter((x) => x.route !== g.route).slice(0, 4);
  return (
    <Layout page={{ route: g.leadRoute, pageCode: g.pageCode, service, contactHref: "#enquire", ctaShort: "Ask a question" }}>
      <PageHero eyebrow="Guide" title={g.title} crumbs={[{ name: "Home", to: "/" }, { name: "Guides" }, { name: g.title }]} />
      <div className="wrap grid gap-14 py-14 lg:grid-cols-[minmax(0,1fr)_320px] md:py-20">
        <article>
          <p className="text-xl leading-relaxed text-neutral-800">{g.lead}</p>
          <p className="mt-3 text-sm text-muted-foreground">Updated {long(g.updated)}</p>
          {g.sections.map((s) => (
            <section key={s.title} className="mt-12">
              <h2 className="mb-4 text-2xl text-ink md:text-3xl">{s.title}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mb-4 text-[17px] leading-relaxed text-neutral-700">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mb-4 list-disc space-y-2 pl-6 text-[17px] leading-relaxed text-neutral-700 marker:text-tan-deep">
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
            </section>
          ))}
          {g.sources && g.sources.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-3 text-lg text-ink">Official sources</h2>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                {g.sources.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink">{src.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-8 rounded-md bg-paper p-4 text-sm text-muted-foreground">
            This guide is general information, not legal or planning advice for your property. Rules change; check with your local council or a qualified professional before relying on it.
          </p>
        </article>
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          {g.related && g.related.length > 0 && (
            <div className="rounded-lg border border-border p-6">
              <h2 className="mb-3 text-lg text-ink">Related services</h2>
              <ul className="space-y-2">
                {g.related.map((l) => (
                  <li key={l.route}>
                    <Link to={l.route} className="link-arrow text-[15px] text-ink">{l.label} <ArrowRight className="h-4 w-4" /></Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-lg bg-ink p-6 text-white">
            <h2 className="text-lg">Questions about your own project?</h2>
            <p className="mt-2 text-sm text-white/75">Ask {r.person}. Send photos by WhatsApp if it helps.</p>
            <a href={waLink(g.leadRoute, g.pageCode, service)} target="_blank" rel="noreferrer" data-route={g.leadRoute} data-page={g.pageCode} className="btn-tan mt-4 h-11 w-full text-sm">
              <MessageCircle className="h-4 w-4" /> WhatsApp {r.person}
            </a>
          </div>
          {others.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg text-ink">More guides</h2>
              <ul className="space-y-2 text-[15px]">
                {others.map((o) => (
                  <li key={o.route}><Link to={o.route} className="text-ink underline-offset-4 hover:underline">{o.title}</Link></li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
      <section id="enquire" className="scroll-mt-20 bg-paper py-16">
        <div className="wrap max-w-3xl">
          <h2 className="mb-6 text-2xl text-ink md:text-3xl">Ask us about your project</h2>
          <EnquiryForm route={g.leadRoute} pageCode={g.pageCode} service={service} />
        </div>
      </section>
    </Layout>
  );
}
