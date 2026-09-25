export const projectCategories = [
  "Garden room",
  "Granny flat",
  "Extension",
  "Landscaping",
  "Commercial",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Town or area. Hidden on the page while empty. */
  location?: string;
  /** One or two sentences. */
  summary: string;
  /** Paths under /assets. The first image is the cover. */
  images: string[];
  architect?: string;
};

/** Which service pages link to a filtered Projects view, and with which category. */
export const projectCategory: Partial<Record<string, ProjectCategory>> = {
  "garden-rooms": "Garden room",
  "granny-flats": "Granny flat",
  "home-extensions": "Extension",
  "landscaping-pergolas": "Landscaping",
};

export const projects: Project[] = [
  {
    slug: "composite-clad-garden-room",
    title: "Composite clad garden room",
    category: "Garden room",
    location: "",
    summary:
      "Insulated garden room with slatted composite cladding, French doors and external lighting, built on a new porcelain patio.",
    images: [
      "/assets/projects/garden-room-dark-clad-sunset.jpg",
      "/assets/projects/garden-room-during-build.jpg",
    ],
  },
  {
    slug: "garden-room-and-sauna",
    title: "Garden room and sauna",
    category: "Garden room",
    location: "",
    summary:
      "A timber clad garden room with bifold doors and a matching standalone sauna, set into a landscaped lawn.",
    images: ["/assets/projects/garden-room-and-sauna-timber-clad.jpg"],
  },
  {
    slug: "garden-office-with-lighting",
    title: "Garden office with lighting",
    category: "Garden room",
    location: "",
    summary:
      "Garden office with composite cladding, a stepping stone path and low level garden lighting.",
    images: ["/assets/projects/garden-office-dusk-lighting.jpg"],
  },
  {
    slug: "garden-room-with-artificial-grass",
    title: "Garden room with artificial grass",
    category: "Garden room",
    location: "",
    summary:
      "Clad garden room with a separate store, artificial grass, stepping stones and a porcelain patio.",
    images: ["/assets/projects/garden-room-astro-stepping-stones.jpg"],
  },
  {
    slug: "clad-garden-dwelling",
    title: "Clad garden dwelling",
    category: "Granny flat",
    location: "",
    summary:
      "Self-contained garden dwelling with a rooflight, composite cladding and a landscaped garden.",
    images: [
      "/assets/projects/granny-flat-clad-front.jpg",
      "/assets/projects/granny-flat-clad-aerial.jpg",
    ],
  },
  {
    slug: "rendered-garden-dwelling",
    title: "Rendered garden dwelling",
    category: "Granny flat",
    location: "",
    summary: "Rendered garden dwelling with rooflights, French doors and a private patio.",
    images: ["/assets/projects/granny-flat-rendered-flat-roof.jpg"],
  },
  {
    slug: "rear-extension-standing-seam-roof",
    title: "Rear extension with standing seam roof",
    category: "Extension",
    location: "",
    summary:
      "Single storey rear extension with a standing seam roof, rooflight and wide sliding doors.",
    images: [
      "/assets/projects/extension-standing-seam-roof.jpg",
      "/assets/projects/extension-interior-rooflight.jpg",
    ],
  },
  {
    slug: "rear-extension-zinc-fascia",
    title: "Rear extension with zinc fascia",
    category: "Extension",
    location: "",
    summary:
      "Rendered rear extension with a zinc fascia and full width French doors onto the garden.",
    images: ["/assets/projects/extension-rear-zinc-fascia.jpg"],
  },
  {
    slug: "extension-frameless-glass",
    title: "Extension with frameless glass",
    category: "Extension",
    location: "",
    summary: "Rear extension opening fully to the garden with frameless sliding glass.",
    images: ["/assets/projects/extension-frameless-glass.jpg"],
  },
  {
    slug: "patio-and-garden-store",
    title: "Patio and garden store",
    category: "Landscaping",
    location: "",
    summary:
      "Porcelain patios, gravel paths and planting, with a glass fronted garden store.",
    images: [
      "/assets/projects/patio-porcelain-garden-shed.jpg",
      "/assets/projects/garden-store-glass-front-dusk.jpg",
    ],
  },
  {
    slug: "bah33-royal-hibernian-way",
    title: "BAH33, Royal Hibernian Way, Dublin 2",
    category: "Commercial",
    location: "",
    summary:
      "Design and build of a restaurant fit out, completed in 2024, increasing capacity from about 26 to 80 seats.",
    images: ["/assets/bah33-restaurant.webp"],
  },
];
