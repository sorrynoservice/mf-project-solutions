import { Link } from "react-router-dom";

const services = [
  {
    title: "Garden Rooms",
    description: "Offices, studios and gyms up to 30m² without planning.",
    image: "/assets/projects/garden-room-dark-clad-sunset.jpg",
    path: "/garden-rooms",
  },
  {
    title: "Granny Flats",
    description: "32m² to 45m² garden dwellings, now without planning.",
    image: "/assets/projects/granny-flat-clad-front.jpg",
    path: "/granny-flats",
  },
  {
    title: "Home Extensions",
    description: "Rear and side extensions, up to 45m² without planning.",
    image: "/assets/projects/extension-standing-seam-roof.jpg",
    path: "/home-extensions",
  },
  {
    title: "Bathroom Renovations",
    description: "Full bathroom and ensuite renovations by one team.",
    image: "/assets/bathroom-renovations-hero-new-C7-melRI.jpg",
    path: "/bathroom-renovations",
  },
  {
    title: "Landscaping & Pergolas",
    description: "Porcelain patios, artificial grass, decking and pergolas.",
    image: "/assets/projects/patio-porcelain-garden-shed.jpg",
    path: "/landscaping-pergolas",
  },
  {
    title: "Kitchen Renovations",
    description: "Kitchen supply and fit, with joinery from our own workshop.",
    image: "/assets/kitchen-renovations-work-2-Dq89EN1Q.jpg",
    path: "/kitchen-renovations",
  },
  {
    title: "Refurbishments & Fit Outs",
    description: "Whole house refurbishments and fit outs.",
    image: "/assets/home-extensions-work-3-Pz2e_WY6.jpg",
    path: "/interior-design",
  },
  {
    title: "Snagging Inspections",
    description: "Photo reports for new homes within 24 to 48 hours.",
    image: "/assets/snag-report-sample-3Qb2iZE3.jpg",
    path: "/snagging",
  },
];

const Services = () => (
  <section id="services" className="py-20 bg-[#0d3832]">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-serif mb-12 text-center text-white">Our Services</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <Link
            key={service.path}
            to={service.path}
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
          >
            <div className="h-64 overflow-hidden rounded mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
              <img decoding="async"
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-2xl font-serif mb-2 text-white group-hover:text-[#d4af37] transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-white/80">{service.description}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
