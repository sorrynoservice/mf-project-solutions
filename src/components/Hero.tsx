import { ChevronDown, MessageCircle, Star } from "lucide-react";
import { company, contacts } from "@/data/site";
import googleRating from "@/data/google-rating.json";

const POSTER = "/assets/hero-poster-optimized-C0BHb9VF.jpg";

/** Phones and data-saver visitors get the poster image only, never the video file. */
const shouldPlayVideo = () => {
  if (typeof window === "undefined") return false;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return window.matchMedia("(min-width: 768px)").matches && !saveData;
};

const Hero = () => (
  <section
    className="relative min-h-[100svh] flex flex-col justify-center pt-20 bg-cover bg-center"
    style={{ backgroundImage: `url("${POSTER}")` }}
  >
    {shouldPlayVideo() && (
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={POSTER}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
      >
        <source src="/assets/hero-video-new-BswOoI6M.mp4" type="video/mp4" />
      </video>
    )}

    <div className="absolute inset-0 bg-black/30" />

    <div className="container mx-auto px-4 relative z-10 text-white flex-grow flex items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-[#d4af37] text-xs md:text-sm uppercase tracking-[0.3em] mb-6 md:mb-8 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Garden Rooms, Extensions &amp; Renovations in Dublin &amp; Meath
        </h1>
        <p className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight font-light drop-shadow-lg">
          Live Exceptionally,
          <br />
          <span className="text-[#d4af37] italic">From the Ground Up</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="#contact"
            className="inline-flex items-center justify-center h-14 rounded-lg px-8 text-base font-semibold bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90 shadow-lg transition-colors w-full sm:w-auto"
          >
            Request a free site visit
          </a>
          <a
            href={contacts.construction.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 h-14 rounded-lg px-8 text-base font-semibold border-2 border-white text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp us
          </a>
        </div>

        <a
          href={company.reviewUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm text-white/90 hover:text-white drop-shadow"
        >
          <span className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
            ))}
          </span>
          {googleRating.rating.toFixed(1)} from {googleRating.count}+ Google reviews
        </a>
      </div>
    </div>

    <div className="relative z-10 pb-6 hidden md:flex justify-center">
      <ChevronDown className="w-8 h-8 text-white/70 animate-bounce" />
    </div>
  </section>
);

export default Hero;
