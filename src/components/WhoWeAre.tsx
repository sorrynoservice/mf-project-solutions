import { coverage } from "@/data/site";

const scrollToContact = () =>
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

const WhoWeAre = () => (
  <section id="who-we-are" className="py-20 bg-[#0a2e2a]">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img decoding="async"
            src="/assets/projects/garden-room-and-sauna-timber-clad.jpg"
            alt="Timber clad garden room and sauna built by MF Project Solutions"
            loading="lazy"
            className="rounded shadow-luxury w-full h-[600px] object-cover"
          />
        </div>
        <div>
          <p className="text-[#d4af37] text-sm uppercase tracking-wider mb-4">WHO ARE WE</p>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">
            Engineering Led Design and Build, From Site Visit to Handover
          </h2>
          <p className="text-white/80 mb-4">
            MF Project Solutions designs and builds garden rooms, granny flats, extensions and full
            home renovations {coverage.summary}.
          </p>
          <p className="text-white/80 mb-8">
            Our own team of around 15 and our joinery workshop in Drumree, Co. Meath deliver every
            job, led by an engineer who has worked in construction since 1999. We work in English and
            Portuguese, with one point of contact from quote to handover.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-transparent h-11 px-6 py-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a2e2a]"
          >
            Get in touch
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default WhoWeAre;
