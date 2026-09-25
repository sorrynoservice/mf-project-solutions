import { Link } from "react-router-dom";

const services = [
  {
    title: "Garden Rooms",
    description: "Offices, studios and gyms up to 30m² without planning.",
    image: "/assets/garden-rooms-ypVOr4yH.png",
    path: "/garden-rooms",
  },
  {
    title: "Granny Flats",
    description: "32m² to 45m² garden dwellings, now without planning.",
    image: "/assets/garden-rooms-premium-DU6PxPWY.jpg",
    path: "/granny-flats",
  },
  {
    title: "Home Extensions",
    description: "Seamless design integration and added space.",
    image: "/assets/home-extensions-DgHDcJpu.png",
    path: "/home-extensions",
  },
  {
    title: "Bathroom Renovations",
    description: "Spa-inspired retreats designed around you.",
    image: "/assets/bathroom-renovations-BJFKzv_J.png",
    path: "/bathroom-renovations",
  },
  {
    title: "Landscaping & Pergolas",
    description: "Outdoor spaces, thoughtfully crafted.",
    image: "/assets/landscaping-pergolas-BjRKCXFJ.png",
    path: "/landscaping-pergolas",
  },
  {
    title: "Kitchen Renovations",
    description: "Functional elegance meets premium appliances.",
    image: "/assets/kitchen-renovations-0zNQxvHm.png",
    path: "/kitchen-renovations",
  },
  {
    title: "Interior Design",
    description: "Whole house refurbishments and fit outs.",
    image: "/assets/interior-design-8V-tTggI.png",
    path: "/interior-design",
  },
  {
    title: "Snagging Inspections",
    description: "Photo reports for new homes within 24 to 48 hours.",
    image: "/assets/inspection-construction-wyPzuRnm.jpg",
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
              <img
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
