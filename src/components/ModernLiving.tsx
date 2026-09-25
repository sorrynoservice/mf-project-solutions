import { company } from "@/data/site";
import googleRating from "@/data/google-rating.json";

const stats = [
  { value: String(company.established), label: "Established" },
  { value: "25+", label: "Years of engineering and construction experience" },
  { value: "500+", label: "Projects and inspections" },
  { value: googleRating.rating.toFixed(1), label: `Stars from ${googleRating.count}+ Google reviews` },
];

const ModernLiving = () => (
  <section className="py-20 bg-[#1a1a1a]">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-[#8b9d8a]/30 to-transparent rounded" />
          <div className="absolute -inset-2 border-4 border-[#8b9d8a]/40 rounded" />
          <img
            src="/assets/home-extensions-work-1-CkYlBiXD.jpg"
            alt="Kitchen and dining extension by MF Project Solutions"
            loading="lazy"
            className="relative rounded w-full h-[500px] object-cover"
          />
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-white">
            Designed for Modern Living
          </h2>
          <p className="text-white/70 mb-12">
            At MF Project Solutions, we design with purpose, creating elegant, functional spaces
            that elevate daily life. Every project is a thoughtful balance of beauty, comfort, and
            innovation, built to meet the demands of contemporary living without compromising on
            style.
          </p>
          <div className="grid grid-cols-2 gap-10">
            {stats.map((st) => (
              <div key={st.label}>
                <div className="text-5xl font-serif text-[#d4af37] mb-2">{st.value}</div>
                <div className="text-xs uppercase tracking-wider text-white/60">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ModernLiving;
