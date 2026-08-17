import { ChevronDown } from "lucide-react";

const Hero = () => (
  <section
    className="relative min-h-screen flex flex-col justify-center pt-20 bg-cover bg-center"
    style={{ backgroundImage: 'url("/assets/hero-poster-optimized-C0BHb9VF.jpg")' }}
  >
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/assets/hero-poster-optimized-C0BHb9VF.jpg"
      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
    >
      <source src="/assets/hero-video-new-BswOoI6M.mp4" type="video/mp4" />
    </video>

    <div className="absolute inset-0 bg-black/20" />

    <div className="container mx-auto px-4 relative z-10 text-white flex-grow flex items-center justify-center">
      <div className="max-w-4xl text-center">
        <p className="text-[#d4af37] text-xs md:text-sm uppercase tracking-[0.3em] mb-8 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Welcome To MF Project Solutions
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4 leading-tight font-light drop-shadow-lg">
          Live Exceptionally,
          <br />
          <span className="text-[#d4af37] italic">From the Ground Up</span>
        </h1>
      </div>
    </div>

    <div className="relative z-10 pb-8 flex justify-center">
      <ChevronDown className="w-8 h-8 text-white/70 animate-bounce" />
    </div>
  </section>
);

export default Hero;
