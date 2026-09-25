import { useMemo, useState } from "react";
import { ArrowRight, CircleCheck, Clock, Mail, MessageSquare, Package, Phone, Ruler, Settings } from "lucide-react";
import { useSeo } from "@/lib/seo";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { CALC } from "@/data/calculator";
import { contacts } from "@/data/site";

const wrap = "max-w-7xl mx-auto px-8 sm:px-11 md:px-16 lg:px-22";
const stepCard = "rounded-2xl border border-border shadow-soft p-5 bg-card";
const inputClass = "w-full p-2 border border-border rounded-md text-sm bg-background text-foreground";
const labelClass = "block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1";
const asideCard = "rounded-2xl border border-border shadow-soft p-6 bg-card";

const withVat = (n: number) => n * (1 + CALC.VAT_RATE);
const fmt = (n: number) => "€" + Math.round(n).toLocaleString("en-IE");

type QuoteLine = { label: string; ex: number; isEsc?: boolean; isCont?: boolean };
type Selectable = {
  id: string;
  name: string;
  detail: string;
  priceExVat: number;
  escalation?: boolean;
  contingency?: boolean;
};

/** Artificial grass ships in fixed-width rolls; wider gardens need a second roll and incur waste. */
const grassWaste = (width: number, length: number) => {
  if (!width || !length || width <= 0 || length <= 0) return { area: 0, ex: 0, rolls: 0, esc: false };
  if (width > CALC.MAX_WIDTH) return { area: 0, ex: 0, rolls: 3, esc: true };
  if (width <= CALC.ROLL_WIDTH) return { area: 0, ex: 0, rolls: 1, esc: false };
  const overlap = CALC.ROLL_WIDTH * 2 - width;
  const area = Math.round(overlap * length * 10) / 10;
  return { area, ex: Math.round(area * CALC.WASTE_RATE), rolls: 2, esc: false };
};

const StepHeader = ({ n, title, sub }: { n: number; title: string; sub?: string }) => (
  <>
    <div className="flex items-center gap-2.5 mb-3">
      <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
        {n}
      </span>
      <span className="font-bold text-foreground text-sm">{title}</span>
    </div>
    {sub && <p className="text-xs text-muted-foreground mb-3 pl-8">{sub}</p>}
  </>
);

const ItemRow = ({
  item,
  selected,
  onToggle,
}: {
  item: Selectable;
  selected: boolean;
  onToggle: (id: string) => void;
}) => {
  const price = item.contingency
    ? Math.round(item.priceExVat * (1 + CALC.CONTINGENCY_PCT))
    : item.priceExVat;
  const note = item.contingency
    ? "Preliminary estimate: site survey required"
    : item.escalation
      ? "Site survey required"
      : "";
  return (
    <div
      onClick={() => onToggle(item.id)}
      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
        selected ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
      }`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 text-xs ${
            selected ? "border-accent bg-accent text-accent-foreground" : "border-border"
          }`}
        >
          {selected ? "✓" : ""}
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.detail}</div>
          {note && <div className="text-[10px] text-amber-600 italic">{note}</div>}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-sm font-bold text-accent">
          {item.escalation || item.contingency ? "From " : ""}
          {fmt(withVat(price))}
        </div>
      </div>
    </div>
  );
};

const GardenCalculator = () => {
  useSeo("/garden-calculator");
  const [mode, setMode] = useState<"fixed" | "custom">("fixed");
  const [pkg, setPkg] = useState<string | null>(null);
  const [patio, setPatio] = useState(0);
  const [grass, setGrass] = useState(0);
  const [length, setLength] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [beds, setBeds] = useState<string[]>([]);
  const [drains, setDrains] = useState<string[]>([]);
  const [structures, setStructures] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const toggle = (list: string[], set: (v: string[]) => void) => (id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const overLimit = mode === "custom" && patio + grass > CALC.CUSTOM_MAX_AREA;
  const waste = grassWaste(Number(width) || 0, Number(length) || 0);
  const detailsComplete = Boolean(name && phone && email);

  const quote = useMemo(() => {
    const lines: QuoteLine[] = [];
    let totEx = 0;
    let hasBase = false;
    let hasEsc = false;
    let hasCont = false;

    if (mode === "fixed" && pkg) {
      const p = CALC.packages.find((x) => x.id === pkg);
      if (p) {
        lines.push({ label: `${p.name} (${p.area}m²)`, ex: p.priceExVat });
        totEx += p.priceExVat;
        hasBase = true;
      }
    } else if (mode === "custom" && (patio > 0 || grass > 0) && !overLimit) {
      if (patio > 0) {
        const ex = patio * CALC.CUSTOM_PATIO_RATE;
        lines.push({ label: `Porcelain Paving (${patio}m²)`, ex });
        totEx += ex;
      }
      if (grass > 0) {
        const ex = grass * CALC.CUSTOM_GRASS_RATE;
        lines.push({ label: `Artificial Grass (${grass}m²)`, ex });
        totEx += ex;
      }
      hasBase = true;
    }

    if (waste.ex > 0 && hasBase) {
      lines.push({ label: `Grass Waste (${waste.area}m²)`, ex: waste.ex });
      totEx += waste.ex;
    }
    if (waste.esc) hasEsc = true;

    beds.forEach((id) => {
      const b = CALC.beds.find((x) => x.id === id);
      if (!b) return;
      lines.push({ label: b.name, ex: b.priceExVat });
      totEx += b.priceExVat;
    });

    drains.forEach((id) => {
      const dr = CALC.drainage.find((x) => x.id === id);
      if (!dr) return;
      if (dr.escalation) hasEsc = true;
      lines.push({ label: dr.name, ex: dr.priceExVat, isEsc: dr.escalation });
      totEx += dr.priceExVat;
    });

    structures.forEach((id) => {
      const st = CALC.structures.find((x) => x.id === id);
      if (!st) return;
      let ex = st.priceExVat;
      if (st.escalation) hasEsc = true;
      if (st.contingency) {
        ex += Math.round(st.priceExVat * CALC.CONTINGENCY_PCT);
        hasCont = true;
      }
      lines.push({ label: st.name, ex, isEsc: st.escalation, isCont: st.contingency });
      totEx += ex;
    });

    return { lines, totEx, totInc: withVat(totEx), hasItems: lines.length > 0, hasEsc, hasCont };
  }, [mode, pkg, patio, grass, beds, drains, structures, waste.ex, waste.area, waste.esc, overLimit]);

  const requestQuote = () => {
    if (!detailsComplete || !quote.hasItems) return;
    const body: string[] = [];
    body.push(`Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`, "");
    quote.lines.forEach((l) => body.push(`${l.label}: ${fmt(withVat(l.ex))}`));
    body.push("", `Total (inc VAT): ${fmt(quote.totInc)}`, "");
    body.push(`Garden dimensions: ${length && width ? `${length}m × ${width}m` : "Not provided"}`);
    if (quote.hasEsc || quote.hasCont) {
      body.push("");
      body.push("Note: Some items require site confirmation. Final price confirmed after site inspection.");
    }
    body.push("", "This is an indicative estimate generated via the online configurator.");
    const subject = encodeURIComponent(`Quote Request: ${name}, ${fmt(quote.totInc)}`);
    window.location.href = `mailto:${CALC.EMAIL}?subject=${subject}&body=${encodeURIComponent(body.join("\n"))}`;
  };

  const structureCats = useMemo(() => {
    const cats: string[] = [];
    CALC.structures.forEach((s) => {
      if (!cats.includes(s.cat)) cats.push(s.cat);
    });
    return cats;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />

      <section className="relative bg-foreground pt-24 pb-16">
        <div className={wrap}>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-background mb-4">
              How Much Does a Garden Renovation Cost?
            </h1>
            <p className="text-lg text-background/70 max-w-2xl mx-auto mb-6">
              Welcome to our online calculator for garden renovations. Get an instant estimate for
              your project, from artificial grass and porcelain paving to pergolas and garden
              rooms.
            </p>
            <p className="text-sm text-background/50 max-w-xl mx-auto">
              Don't hesitate to{" "}
              <a
                href={`https://wa.me/${CALC.WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-2"
              >
                contact us
              </a>{" "}
              directly if you have any questions or need assistance. We're here to help!
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className={wrap}>
          <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start [&>*]:min-w-0">
            <div>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Get Your Instant Quote
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  Please note that the prices provided are only a guide as every garden is unique
                  and requires a tailored approach. We take into consideration various factors
                  including groundworks, labour, drainage requirements, ease of access for
                  machinery, and existing site conditions.
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setMode("fixed")}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      mode === "fixed"
                        ? "border-accent bg-accent/5 shadow-soft"
                        : "border-border bg-card hover:border-accent/50"
                    }`}
                  >
                    <Package className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="text-sm font-bold text-foreground">Fixed Packages</div>
                    <div className="text-xs text-muted-foreground">Pre-configured garden sizes</div>
                  </button>
                  <button
                    onClick={() => setMode("custom")}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      mode === "custom"
                        ? "border-accent bg-accent/5 shadow-soft"
                        : "border-border bg-card hover:border-accent/50"
                    }`}
                  >
                    <Settings className="w-6 h-6 text-accent mx-auto mb-2" />
                    <div className="text-sm font-bold text-foreground">Custom Build</div>
                    <div className="text-xs text-muted-foreground">
                      Choose your own m² breakdown
                    </div>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className={stepCard}>
                    <StepHeader
                      n={1}
                      title={mode === "fixed" ? "Choose Your Package" : "Custom Areas"}
                    />
                    {mode === "fixed" ? (
                      <div className="grid sm:grid-cols-3 gap-3">
                        {CALC.packages.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => setPkg(p.id === pkg ? null : p.id)}
                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                              pkg === p.id
                                ? "border-accent bg-accent/5 shadow-soft"
                                : "border-border hover:border-accent/50 hover:shadow-soft"
                            }`}
                          >
                            {p.badge && (
                              <span className="absolute -top-2 right-3 bg-amber-600 text-white text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">
                                {p.badge}
                              </span>
                            )}
                            <div className="font-bold text-sm text-foreground">{p.name}</div>
                            <div className="text-xs text-muted-foreground mb-2">{p.area}m² garden</div>
                            <div className="text-2xl font-bold text-accent">
                              {fmt(withVat(p.priceExVat))}
                            </div>
                            <div className="text-[9px] text-muted-foreground">inc VAT</div>
                            <div className="text-[10px] text-muted-foreground mt-2 border-t border-border pt-2">
                              {p.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex gap-3 flex-wrap">
                          <div className="flex-1 min-w-[130px]">
                            <label className={labelClass}>Porcelain Paving (m²)</label>
                            <select
                              value={patio}
                              onChange={(e) => setPatio(Number(e.target.value))}
                              className={inputClass}
                            >
                              <option value={0}>None</option>
                              {CALC.PATIO_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o} m²
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex-1 min-w-[130px]">
                            <label className={labelClass}>Artificial Grass (m²)</label>
                            <select
                              value={grass}
                              onChange={(e) => setGrass(Number(e.target.value))}
                              className={inputClass}
                            >
                              <option value={0}>None</option>
                              {CALC.GRASS_OPTIONS.map((o) => (
                                <option key={o} value={o}>
                                  {o} m²
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div
                          className={`rounded-lg px-3 py-2 text-xs ${
                            overLimit
                              ? "bg-destructive/10 text-destructive"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          {overLimit
                            ? `Combined area: ${patio + grass}m² exceeds ${CALC.CUSTOM_MAX_AREA}m² limit. Please contact us directly.`
                            : `Patio ${patio}m² + Grass ${grass}m² = ${patio + grass}m²: ${fmt(
                                withVat(
                                  patio * CALC.CUSTOM_PATIO_RATE + grass * CALC.CUSTOM_GRASS_RATE
                                )
                              )}`}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={stepCard}>
                    <StepHeader
                      n={2}
                      title="Garden Dimensions"
                      sub="Enter approximate length and width. Used to calculate grass material charges."
                    />
                    <div className="flex gap-3 flex-wrap">
                      <div className="flex-1 min-w-[130px]">
                        <label className={labelClass}>Length (metres)</label>
                        <input
                          type="number"
                          placeholder="e.g. 10"
                          min={1}
                          max={40}
                          step={0.1}
                          value={length}
                          onChange={(e) =>
                            setLength(e.target.value === "" ? "" : Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                      <div className="flex-1 min-w-[130px]">
                        <label className={labelClass}>Width (metres)</label>
                        <input
                          type="number"
                          placeholder="e.g. 7"
                          min={1}
                          max={20}
                          step={0.1}
                          value={width}
                          onChange={(e) =>
                            setWidth(e.target.value === "" ? "" : Number(e.target.value))
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={stepCard}>
                    <StepHeader
                      n={3}
                      title="Raised Beds"
                      sub="Professionally built and installed. All materials and labour included."
                    />
                    <div className="space-y-2">
                      {CALC.beds.map((b) => (
                        <ItemRow
                          key={b.id}
                          item={b}
                          selected={beds.includes(b.id)}
                          onToggle={toggle(beds, setBeds)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={stepCard}>
                    <StepHeader
                      n={4}
                      title="Drainage"
                      sub="Optional. Recommended if your garden has poor water runoff or low spots."
                    />
                    <div className="space-y-2">
                      {CALC.drainage.map((dr) => (
                        <ItemRow
                          key={dr.id}
                          item={dr}
                          selected={drains.includes(dr.id)}
                          onToggle={toggle(drains, setDrains)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={stepCard}>
                    <StepHeader
                      n={5}
                      title="Structures & Outdoor Living"
                      sub="Fully designed and installed by our construction team."
                    />
                    {structureCats.map((cat) => (
                      <div key={cat} className="mb-4 last:mb-0">
                        <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                          {cat}
                        </div>
                        <div className="space-y-2">
                          {CALC.structures
                            .filter((s) => s.cat === cat)
                            .map((s) => (
                              <ItemRow
                                key={s.id}
                                item={s}
                                selected={structures.includes(s.id)}
                                onToggle={toggle(structures, setStructures)}
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={stepCard}>
                    <StepHeader
                      n={6}
                      title="Your Details"
                      sub="We need your contact information to send your confirmed quote."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="Your phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Email Address</label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-foreground p-5 text-background shadow-luxury sticky bottom-3 z-30">
                  <div className="text-[9px] font-extrabold tracking-[3px] uppercase text-background/25 mb-3">
                    Your Estimate
                  </div>

                  {!quote.hasItems ? (
                    <div className="text-center text-sm text-background/20 py-2">
                      Select a package or configure your garden to begin
                    </div>
                  ) : overLimit ? (
                    <div className="text-center text-sm text-background/20 py-2">
                      Area exceeds limit. Please contact us directly
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1 mb-3">
                        {quote.lines.map((line, i) => (
                          <div
                            key={i}
                            className={`flex justify-between text-xs ${
                              line.isEsc || line.isCont
                                ? "text-amber-400 italic"
                                : "text-background/50"
                            }`}
                          >
                            <span>
                              {line.label}
                              {line.isCont ? " *" : ""}
                            </span>
                            <span>
                              {line.isEsc || line.isCont ? "From " : ""}
                              {fmt(withVat(line.ex))}
                            </span>
                          </div>
                        ))}
                      </div>
                      {quote.hasCont && (
                        <div className="text-[10px] text-background/28 italic mb-2">
                          * Includes {Math.round(CALC.CONTINGENCY_PCT * 100)}% preliminary
                          contingency
                        </div>
                      )}
                      <div className="h-px bg-background/10 my-2" />
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-semibold text-background/50">
                          {quote.hasEsc || quote.hasCont ? "Estimated Total" : "Total"}
                        </span>
                        <span className="text-2xl font-bold text-background">
                          {quote.hasEsc || quote.hasCont ? "From " : ""}
                          {fmt(quote.totInc)}
                        </span>
                      </div>
                      <div className="text-right text-[9px] text-background/22 mt-1">
                        Including {(CALC.VAT_RATE * 100).toFixed(1)}% VAT
                      </div>
                      {!detailsComplete && (
                        <>
                          <div className="h-px bg-background/10 my-2" />
                          <div className="text-[10px] text-background/28 italic text-center">
                            ↑ Enter your name, phone &amp; email above to request your quote
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div className="flex gap-3 mt-4 flex-wrap">
                    <button
                      onClick={requestQuote}
                      disabled={!detailsComplete || !quote.hasItems || overLimit}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 luxury-gradient text-primary-foreground hover:opacity-90 shadow-luxury font-semibold h-14 rounded-lg px-10 text-base flex-1 min-w-[180px] disabled:pointer-events-none disabled:opacity-50"
                    >
                      ✉️ Request Site Confirmation <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-muted rounded-xl text-[10px] text-muted-foreground leading-relaxed">
                  <div className="font-semibold text-foreground mb-1">Important Information</div>
                  This calculator provides an{" "}
                  <strong className="text-foreground">indicative estimate</strong> based on standard
                  site conditions. Final fixed price confirmed after site inspection. Prices include
                  13.5% VAT. Grass waste charges depend on exact garden width (4m standard roll
                  width). Structural upgrades and garden rooms require a site visit for confirmed
                  pricing. All work designed and project-managed by a qualified construction
                  engineer. MF Project Solutions, Dublin.{" "}
                  <strong className="text-foreground">{CALC.EMAIL}</strong>
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className={asideCard}>
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Ruler className="w-5 h-5 text-accent" /> How Do I Measure My Garden?
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Measure the width and length of the area you'd like renovated. For irregular
                  shapes, break the area into smaller rectangles and add the totals together.
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong className="text-foreground">Example:</strong> If your garden is 5m wide
                  and 8m long, the area is 40m².
                </p>
                <p className="text-sm text-muted-foreground">
                  Our artificial grass comes in 4m-wide rolls. Gardens wider than 4m require two
                  rolls, which may generate a small waste charge, which the calculator handles
                  automatically.
                </p>
              </div>

              <div className={asideCard}>
                <h3 className="font-bold text-foreground mb-3">What's Included?</h3>
                <ul className="space-y-2">
                  {[
                    "All materials and labour",
                    "Dig-out and sub-base preparation",
                    "Professional installation",
                    "Waste removal and site cleanup",
                    "VAT included in all prices",
                    "Written quotation before work begins",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CircleCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div id="contact" className={`${asideCard} scroll-mt-24`}>
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" /> Prefer to Talk?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team is available to discuss your project and provide a personalised quote.
                </p>
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${CALC.WHATSAPP}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-accent" /> WhatsApp Us
                  </a>
                  <a
                    href={contacts.construction.tel}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4 text-accent" /> {contacts.construction.display}
                  </a>
                  <a
                    href={`mailto:${CALC.EMAIL}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4 text-accent" /> {CALC.EMAIL}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter tagline="Garden Renovation Calculator" variant="calculator" />
    </div>
  );
};

export default GardenCalculator;
