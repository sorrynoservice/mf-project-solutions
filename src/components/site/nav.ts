/** Main navigation. The corporate menu leads with larger work; smaller services sit one level down. */
export type NavLink = { name: string; to: string; note?: string };

export const residentialMain: NavLink[] = [
  { name: "Extensions", to: "/home-extensions" },
  { name: "House renovations", to: "/house-renovations" },
  { name: "Attic conversions", to: "/attic-conversions" },
  { name: "Garden homes and granny flats", to: "/granny-flats" },
  { name: "Kitchens", to: "/kitchens" },
  { name: "Bespoke joinery", to: "/bespoke-joinery" },
];

export const residentialOther: NavLink[] = [
  { name: "Bathrooms", to: "/bathroom-renovations" },
  { name: "Garden rooms", to: "/garden-rooms" },
  { name: "Porcelain patios", to: "/porcelain-patios" },
  { name: "Landscaping", to: "/landscaping" },
  { name: "Timber verandas and glass rooms", to: "/timber-verandas-glass-rooms" },
  { name: "Decking and pergolas", to: "/decking-pergolas" },
];

export const commercialLinks: NavLink[] = [
  { name: "Commercial work", to: "/commercial" },
  { name: "Commercial fit-outs", to: "/commercial-fit-outs" },
  { name: "For architects and designers", to: "/for-architects" },
];

export const propertyLinks: NavLink[] = [
  { name: "Property services", to: "/property-services" },
  { name: "Snagging inspections", to: "/snagging" },
  { name: "Pre-purchase inspections", to: "/pre-purchase-survey" },
];
