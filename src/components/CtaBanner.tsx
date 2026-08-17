const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

const CtaBanner = () => (
  <section className="relative py-32 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url("/assets/cta-background-D2zlZgy1.jpg")' }}
    />
    <div className="absolute inset-0 bg-black/75" />
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-serif mb-6 text-white drop-shadow-lg">
        Get in touch now so we can talk about your project
      </h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90 drop-shadow-lg">
        In a quick, no-obligation conversation, we can show you how you can carry out your
        renovation in the best way possible.
      </p>
      <button
        onClick={scrollToContact}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-soft hover:shadow-luxury h-14 rounded-lg px-10 text-base bg-[#d4af37] text-[#0a2e2a] hover:bg-[#d4af37]/90"
      >
        Get in touch
      </button>
    </div>
  </section>
);

export default CtaBanner;
