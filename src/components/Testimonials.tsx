import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import googleRating from "@/data/google-rating.json";
import { company } from "@/data/site";

const GoogleLogo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30.44;

const relativeDate = (iso: string) => {
  const months = Math.round((Date.now() - new Date(iso).getTime()) / MS_PER_MONTH);
  if (months < 1) return "this month";
  if (months === 1) return "a month ago";
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? "a year ago" : `${years} years ago`;
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

type Props = {
  /** Which reviews to show. Defaults to all, building reviews first. */
  category?: "build" | "snagging";
  heading?: string;
};

const Testimonials = ({ category, heading = "What our customers are saying" }: Props) => {
  const items = category ? testimonials.filter((t) => t.category === category) : testimonials;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="py-20 bg-[#0a2e2a]">
      <div className="container mx-auto px-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-center text-white">
            {heading}
          </h2>

          <div className="flex items-center justify-center gap-3 mb-8">
            <a
              href={company.reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-4 py-2 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group"
            >
              <GoogleLogo />
              <div className="flex items-center gap-1">
                <span className="text-white font-semibold text-lg">{googleRating.rating.toFixed(1)}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
              </div>
              <span className="text-white/70 text-sm">({googleRating.count} reviews)</span>
              <ExternalLink className="w-4 h-4 text-white/60 group-hover:text-white/80 transition-colors" />
            </a>
          </div>

          <div className="relative w-full" role="region" aria-roledescription="carousel">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {items.map((testimonial) => (
                  <div
                    key={testimonial.name}
                    role="group"
                    aria-roledescription="slide"
                    className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10 flex flex-col h-[220px]">
                      <div className="flex items-start gap-3 mb-3">
                        {testimonial.avatar ? (
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div
                            aria-hidden="true"
                            className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-[#d4af37] text-[#0a2e2a] text-sm font-semibold"
                          >
                            {initials(testimonial.name)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm truncate">
                            {testimonial.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-[#d4af37] text-[#d4af37]" />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-white/60 whitespace-nowrap">
                          {relativeDate(testimonial.date)}
                        </span>
                      </div>
                      <p className="text-white/80 text-base leading-relaxed line-clamp-5">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 hidden md:flex -left-3 2xl:-left-12 bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border absolute h-8 w-8 rounded-full top-1/2 -translate-y-1/2 hidden md:flex -right-3 2xl:-right-12 bg-white/10 border-white/20 hover:bg-white/20 text-white"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
