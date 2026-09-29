import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { galleryTypes, type GalleryKey } from "@/data/gallery";
import { ContactSection, Gallery, wrap } from "@/components/work/Work";
import { useSeo } from "@/lib/seo";

const chip = "px-4 py-2 rounded-full border text-sm transition-colors whitespace-nowrap";

const GalleryPage = () => {
  useSeo("/gallery");
  const [params, setParams] = useSearchParams();
  const active = (galleryTypes.find((g) => g.key === params.get("type")) ?? galleryTypes[0]) as (typeof galleryTypes)[number];

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />
      <section className="pt-32 pb-8 border-b border-border">
        <div className={wrap}>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight text-foreground mb-4">Gallery</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Photographs of our work by type. Design images and drawings are labelled; everything else is a photograph of work we built.
          </p>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Type of work">
            {galleryTypes.map((g) => (
              <button
                key={g.key}
                role="tab"
                aria-selected={g.key === active.key}
                onClick={() => setParams({ type: g.key as GalleryKey }, { replace: true })}
                className={`${chip} ${g.key === active.key ? "bg-foreground text-background border-foreground" : "border-border text-foreground hover:bg-muted"}`}
              >
                {g.label} <span className="opacity-60">{g.ids.length}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className={wrap}>
          <h2 className="sr-only">{active.label}</h2>
          <Gallery key={active.key} ids={[...active.ids]} cols={4} />
        </div>
      </section>

      <ContactSection />
      <SiteFooter tagline="Gallery" />
    </div>
  );
};

export default GalleryPage;
