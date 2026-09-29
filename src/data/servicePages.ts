import type { ServiceKey } from "@/data/caseStudies";

export type ServicePageData = {
  key: ServiceKey | "residential";
  route: string;
  /** Short name used in menus and breadcrumbs. */
  name: string;
  eyebrow: string;
  title: string;
  lead: string;
  hero: string;
  intro: string[];
  /** What the service covers. */
  includes: { title: string; text: string }[];
  /** Case study slugs to feature, in order. */
  featured: string[];
  /** Extra photos for the gallery, by M number. */
  gallery?: string[];
  /** Design beside built, by M number. */
  pairs?: { design: string; built: string; caption: string }[];
  faqs?: { q: string; a: string }[];
  formType: string;
  /** Links to related pages shown near the end. */
  related?: { label: string; to: string }[];
};

export const servicePages: ServicePageData[] = [
  {
    key: "residential",
    route: "/residential",
    name: "Residential",
    eyebrow: "Residential",
    title: "Homes designed, engineered and built by one team",
    lead: "Whole-house renovations, extensions, kitchens, bathrooms and bespoke joinery across Dublin, Meath and Kildare, often working with your architect.",
    hero: "N081",
    intro: [
      "Most of our residential work is a whole house or a large part of one: structural openings, extensions, new services, kitchens and bathrooms, finished with joinery from our own workshop.",
      "We work to an architect's drawings or produce the design ourselves, and we take responsibility for the build from site set-up to handover.",
    ],
    includes: [],
    featured: ["extension-renovation-phibsborough", "whole-house-renovation-rathcoole", "rear-extension-leixlip", "bathrooms-interiors-leopardstown"],
    formType: "Whole-house renovation",
  },
  {
    key: "whole-house",
    route: "/residential/whole-house-renovations",
    name: "Whole-house renovations",
    eyebrow: "Whole-house renovations",
    title: "Whole-house renovations, from structure to finish",
    lead: "We take a house back to what works, fix what does not, extend where it helps and finish it properly, under one contract.",
    hero: "M85",
    intro: [
      "A whole-house renovation touches every trade at once: structure, roof, insulation, windows, plumbing, heating, electrics, kitchens, bathrooms and joinery. We plan and run all of it with our own site team and trusted specialists, so you deal with one contractor.",
      "Many of these projects start with an architect. We build to your design team's drawings and deal with them directly on site.",
    ],
    includes: [
      { title: "Survey and planning the works", text: "A measured survey, a clear scope and a fixed price before anything starts." },
      { title: "Structure", text: "New openings, steels, foundations and roof works, coordinated with your structural engineer." },
      { title: "Services", text: "New plumbing, heating and electrical installations planned around the new layout." },
      { title: "Kitchens, bathrooms and joinery", text: "Fitted by our own team, with joinery made in our workshop in Drumree." },
      { title: "Documentation", text: "We manage the paperwork, inspections and close-out with your design team." },
    ],
    featured: ["extension-renovation-phibsborough", "whole-house-renovation-rathcoole"],
    pairs: [
      { design: "M331", built: "M89", caption: "Phibsborough living room: design and built" },
    ],
    faqs: [
      {
        q: "Do you work with architects?",
        a: "Yes. A lot of our whole-house work is architect led. We price from the tender drawings and work with the architect and engineer through to handover.",
      },
      {
        q: "Can you design the work as well?",
        a: "Yes. We can produce the layout, 3D views and joinery drawings ourselves, either as a paid design service or as part of a design and build contract.",
      },
      {
        q: "How is the price set?",
        a: "We give a fixed contract price for the agreed scope, with a clear list of what is included and how any changes are priced.",
      },
    ],
    gallery: ["N079", "M95", "M30", "N065", "M24", "N084", "M17", "N074"],
    formType: "Whole-house renovation",
    related: [
      { label: "Extensions and structural alterations", to: "/residential/extensions" },
      { label: "Bespoke joinery", to: "/residential/bespoke-joinery" },
    ],
  },
  {
    key: "extensions",
    route: "/residential/extensions",
    name: "Extensions and attic conversions",
    eyebrow: "Extensions and structural alterations",
    title: "Extensions, structural alterations and attic conversions",
    lead: "Single storey and wraparound extensions, new openings and steels, and attic conversions with stairs, rooflights and en-suites.",
    hero: "M84",
    intro: [
      "We build extensions from the foundations up: groundworks, blockwork, steel, roof structures, rooflights and large glazed openings, then the kitchen or living space inside.",
      "Structural work is coordinated with your engineer. Attic conversions include the new stair, floor structure, rooflights or dormer, insulation and, often, a shower room.",
    ],
    includes: [
      { title: "Rear, side and wraparound extensions", text: "Flat, lean-to and standing seam roofs, with rooflights and sliding or folding doors." },
      { title: "Structural openings", text: "Removing walls, installing steels and forming new openings to your engineer's design." },
      { title: "Attic conversions", text: "New stairs, rooflights, insulation and en-suites, turning roof space into bedrooms or studies." },
      { title: "Finishing the space", text: "Kitchens, floors and joinery fitted by the same team that built the shell." },
    ],
    featured: ["extension-renovation-phibsborough", "rear-extension-leixlip", "attic-conversions", "kitchen-extensions"],
    pairs: [
      { design: "M338", built: "M42", caption: "Leixlip: architect's elevations and the finished extension" },
      { design: "M339", built: "M96", caption: "Leixlip: section through the rooflights and the room under them" },
    ],
    gallery: ["M37", "M41", "M15", "M190", "M188", "M193", "M200", "M43"],
    faqs: [
      {
        q: "Do I need planning permission for an extension?",
        a: "Many single storey rear extensions are exempt within size limits, but it depends on the house and what has been built before. We can advise at the site visit and work with your architect where planning is needed.",
      },
      {
        q: "Who designs the structure?",
        a: "A structural engineer designs the steels and foundations. We work from their design and coordinate their inspections.",
      },
    ],
    formType: "Extension or attic",
    related: [
      { label: "Whole-house renovations", to: "/residential/whole-house-renovations" },
      { label: "Kitchens and bathrooms", to: "/residential/kitchens-bathrooms" },
    ],
  },
  {
    key: "kitchens-bathrooms",
    route: "/residential/kitchens-bathrooms",
    name: "Kitchens and bathrooms",
    eyebrow: "Kitchens and bathrooms",
    title: "Kitchens and bathrooms, designed and built",
    lead: "New kitchens, en-suites and family bathrooms, often designed in 3D first so you can see the room before we build it.",
    hero: "N077",
    intro: [
      "We plan the layout, the services and the finishes, then fit the room with our own team. Where it helps, we draw the room in 3D first so the decisions are made before work starts.",
    ],
    includes: [
      { title: "Layout and 3D design", text: "Plans and 3D views of the room, with finishes and lighting." },
      { title: "Plumbing and electrics", text: "Services moved and renewed to suit the new layout." },
      { title: "Tiling and fitting", text: "Shower areas and floors tiled, and every fitting installed." },
      { title: "Joinery", text: "Vanities, shelving and kitchen details made to measure." },
    ],
    featured: ["bathrooms-interiors-leopardstown", "extension-renovation-phibsborough", "kitchen-living-renovation", "kitchen-extensions"],
    pairs: [
      { design: "M312", built: "M102", caption: "Leopardstown en-suite: MF design and built" },
      { design: "M340", built: "M97", caption: "Leixlip kitchen: architect's drawing and the finished island" },
      { design: "M203", built: "M202", caption: "Kitchen: MF 3D design and built" },
    ],
    gallery: ["M87", "N090", "M91", "N071", "M76", "N041", "N100", "M70"],
    formType: "Kitchen or bathroom",
    related: [{ label: "Interior design", to: "/interior-design" }],
  },
  {
    key: "joinery",
    route: "/residential/bespoke-joinery",
    name: "Bespoke joinery",
    eyebrow: "Bespoke joinery",
    title: "Bespoke joinery from our own workshop",
    lead: "Wardrobes, media walls, bookcases, understairs storage, reception desks and panelling, drawn and made to fit.",
    hero: "M90",
    intro: [
      "Our joinery workshop is in Drumree, Co. Meath. We draw each piece, make it and fit it ourselves, so it fits the room it was designed for.",
    ],
    includes: [
      { title: "Drawn first", text: "Plans, elevations and details agreed before anything is cut." },
      { title: "Made in our workshop", text: "Cut and assembled in Drumree, then fitted by our own team." },
      { title: "Homes and businesses", text: "From eaves wardrobes to a clinic reception desk." },
    ],
    featured: ["whole-house-renovation-rathcoole", "extension-renovation-phibsborough", "clinic-fit-out-dublin-1"],
    pairs: [
      { design: "M130", built: "M138", caption: "Clinic desk: MF drawings and the desk as built" },
      { design: "M341", built: "M44", caption: "Leixlip bookcases: drawing and built" },
    ],
    gallery: ["M10", "N001", "N003", "M12", "N005", "M13", "M25", "N069", "N070", "M31", "M94", "M88"],
    formType: "Bespoke joinery",
  },
  {
    key: "garden-buildings",
    route: "/residential/garden-buildings",
    name: "Garden buildings and garden dwellings",
    eyebrow: "Garden buildings and garden dwellings",
    title: "Garden buildings and garden dwellings, built like part of the house",
    lead: "Insulated garden rooms, studios and self-contained garden dwellings, designed and built by our own team.",
    hero: "M50",
    intro: [
      "A garden building should be built to the same standard as an extension: a proper foundation, an insulated and airtight structure, and services run properly from the house.",
      "Garden dwellings with a bedroom, kitchen and shower room have their own planning and Building Regulations requirements. We explain the route at the site visit.",
    ],
    includes: [
      { title: "Design", text: "Layouts and 3D models so you can see the building in your garden." },
      { title: "Structure", text: "Foundation, insulated timber frame, membranes and cladding." },
      { title: "Services and fit-out", text: "Electrics, plumbing, kitchenettes, shower rooms and built-in storage." },
    ],
    featured: ["our-garden-dwelling", "composite-clad-garden-room", "garden-room-and-sauna", "garden-office-with-lighting", "rendered-garden-rooms", "glazed-garden-room"],
    gallery: ["G74", "G76", "G82", "N018", "M52", "M195", "M196", "M62"],
    formType: "Garden building or garden dwelling",
    related: [
      { label: "Granny flats: the planning rules", to: "/granny-flats" },
      { label: "Outdoor living", to: "/residential/outdoor-living" },
      { label: "Garden cost calculator", to: "/garden-calculator" },
    ],
  },
  {
    key: "outdoor-living",
    route: "/residential/outdoor-living",
    name: "Outdoor living",
    eyebrow: "Outdoor living",
    title: "Outdoor rooms, glass rooms and canopies",
    lead: "Covered outdoor rooms with kitchens, glass rooms, canopies and the patios around them.",
    hero: "M173",
    intro: [
      "Outdoor rooms are built like any other structure: a proper base, a timber or block frame, a roof that drains, and electrics run safely from the house.",
    ],
    includes: [
      { title: "Outdoor rooms and kitchens", text: "Timber framed rooms with built-in barbecues, worktops and bars." },
      { title: "Glass rooms and canopies", text: "Glass rooms and canopies over new patios." },
      { title: "Patios and paving", text: "Porcelain patios laid on a proper base, as part of the project." },
    ],
    featured: ["outdoor-room-ashbourne", "outdoor-rooms-and-canopies", "glass-garden-room-and-garden-store", "glass-fronted-garden-room-louth"],
    formType: "Outdoor living",
    related: [
      { label: "Garden buildings and garden dwellings", to: "/residential/garden-buildings" },
      { label: "Garden cost calculator", to: "/garden-calculator" },
    ],
  },
  {
    key: "interior-design",
    route: "/interior-design",
    name: "Interior design",
    eyebrow: "Interior design, residential and commercial",
    title: "We design it, then we build it",
    lead: "Layouts, 3D views, finishes, lighting and joinery drawings, as a design service on its own or as part of design and build.",
    hero: "N099",
    intro: [
      "Good design saves money on site. We measure the space, agree the brief, draw the layout, show you the rooms in 3D and detail the joinery, so the build follows a plan everyone has seen.",
      "You can take the design to any contractor, or have us build it. The clinic below was designed and fitted out by MF.",
    ],
    includes: [
      { title: "Brief and measured survey", text: "What you need from the space, and accurate measurements to design from." },
      { title: "Layout and 3D views", text: "Plans and 3D views of each room, with finishes and lighting." },
      { title: "Joinery drawings", text: "Details for desks, wardrobes, panelling and storage, ready to make." },
      { title: "Design only, or design and build", text: "Keep the drawings and use your own contractor, or let us build it." },
    ],
    featured: ["clinic-fit-out-dublin-1", "whole-house-renovation-rathcoole", "bathrooms-interiors-leopardstown", "restaurant-fit-out-dublin-2"],
    pairs: [
      { design: "M311", built: "M77", caption: "Leopardstown bathroom: MF design and built" },
      { design: "M320", built: "M21", caption: "Rathcoole dressing room: MF design and built" },
      { design: "M126", built: "M148", caption: "Clinic waiting area: MF design and built" },
    ],
    gallery: ["M149", "M305", "M307", "M208", "M209", "M210", "M315", "M150"],
    formType: "Interior design",
    related: [
      { label: "Commercial fit-out", to: "/commercial" },
      { label: "Bespoke joinery", to: "/residential/bespoke-joinery" },
    ],
  },
  {
    key: "commercial",
    route: "/commercial",
    name: "Commercial",
    eyebrow: "Commercial fit-out",
    title: "Commercial design and fit-out",
    lead: "Clinics, restaurants, retail and offices: designed, built and closed out with your design team.",
    hero: "M159",
    intro: [
      "Operators need a unit designed well, built on time and signed off properly. We handle the design, the fit-out, the joinery and the documentation, and we work with your design team on inspections and close-out.",
    ],
    includes: [
      { title: "Clinics and healthcare", text: "Reception, waiting and consulting areas, with joinery and lighting designed for the practice." },
      { title: "Restaurants and hospitality", text: "Dining rooms, bars, terraces, shopfronts and washrooms, with kitchen layouts." },
      { title: "Retail and offices", text: "Shop and office fit-outs, from layout to handover." },
      { title: "Commercial joinery", text: "Reception desks, counters, panelling and display joinery from our workshop." },
      { title: "Compliance and close-out", text: "Fire stopping, inspections and the documentation your design team needs." },
    ],
    featured: ["clinic-fit-out-dublin-1", "restaurant-fit-out-dublin-2"],
    pairs: [
      { design: "M306", built: "M166", caption: "BAH33 washroom: MF render and the finished room" },
      { design: "M129", built: "M143", caption: "Clinic: MF layout plan and the finished room" },
    ],
    faqs: [
      {
        q: "Can you design the unit as well as fit it out?",
        a: "Yes. We prepare the layout, 3D views, finishes and joinery drawings, then build to them.",
      },
      {
        q: "Do you work with the landlord's and our own design team?",
        a: "Yes. We work with architects, engineers and certifiers on inspections, fire stopping and the documentation needed to close out the works.",
      },
    ],
    formType: "Commercial fit-out",
    related: [{ label: "Interior design", to: "/interior-design" }],
  },
];

export const findPage = (route: string) => servicePages.find((p) => p.route === route);

/** Commercial design work shown on the Commercial page, labelled as design. */
export const commercialDesign = [
  {
    title: "The Ribs, Dublin 1",
    text: "Restaurant fit-out. MF design: lounge 3D views, layout and bar joinery details.",
    images: ["M295", "M296", "M297", "M298"],
  },
  {
    title: "Parmezza, Dublin 1",
    text: "Pizza and pasta counter. MF design: counter 3D views and sections.",
    images: ["M299", "M300", "M301"],
  },
  {
    title: "Food hall, Dublin 7",
    text: "Concept design for a food hall with container stalls and a stage. Not built.",
    images: ["M321", "M322", "M323"],
  },
];
