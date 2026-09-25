import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { company } from "@/data/site";
import googleRating from "@/data/google-rating.json";

const wrap = "max-w-7xl mx-auto px-8 sm:px-11 md:px-16 lg:px-22";

/** Reviews tagged for one service page. Renders nothing if none are tagged yet. */
const ServiceReviews = ({ slug }: { slug: string }) => {
  const items = testimonials.filter((t) => t.services?.includes(slug));
  if (items.length === 0) return null;

  return (
    <section className="py-20 border-t border-border bg-muted/30">
      <div className={wrap}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What our clients say</h2>
          <a
            href={company.reviewUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Rated {googleRating.rating.toFixed(1)} from {googleRating.count}+ Google reviews
          </a>
        </div>
        <div className={items.length === 1 ? "max-w-2xl mx-auto" : "grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"}>
          {items.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border shadow-soft p-6 bg-card">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                ))}
              </div>
              <blockquote className="text-muted-foreground whitespace-pre-line mb-4">{t.text}</blockquote>
              <figcaption className="font-semibold text-foreground">{t.name}, Google review</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceReviews;
