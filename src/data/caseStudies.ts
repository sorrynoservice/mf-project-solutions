/**
 * Case studies and project entries. Photos are referenced by their M number in src/data/work.ts.
 * Rules kept here on purpose:
 *  - Clients are never named. Places are shown by area only.
 *  - Architects are credited where the design is theirs.
 *  - Renders and 3D views are labelled as design, never presented as photographs.
 */

export type ServiceKey =
  | "whole-house"
  | "extensions"
  | "kitchens-bathrooms"
  | "joinery"
  | "garden-buildings"
  | "outdoor-living"
  | "interior-design"
  | "commercial";

export type StageKey = "before" | "design" | "construction" | "technical" | "bespoke" | "finished";

export const stageLabels: Record<StageKey, string> = {
  before: "Before",
  design: "Design",
  construction: "Construction",
  technical: "Technical work",
  bespoke: "Bespoke details",
  finished: "Finished",
};

export type Stage = { stage: StageKey; text?: string; images: string[] };

export type Pair = { design: string; built: string; caption: string };

export type CaseStudy = {
  slug: string;
  title: string;
  sector: "Residential" | "Commercial";
  services: ServiceKey[];
  location: string;
  year?: string;
  architect?: string;
  /** One or two sentences for cards. */
  summary: string;
  /** Longer introduction for the project page. */
  intro?: string[];
  scope?: string[];
  cover: string;
  stages: Stage[];
  pairs?: Pair[];
  /** Shown under the design images, for example how a render was produced. */
  designNote?: string;
  /** Flagships appear first and get the full six stage layout. */
  flagship?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "extension-renovation-phibsborough",
    title: "Extension and full renovation, Phibsborough",
    sector: "Residential",
    services: ["whole-house", "extensions", "kitchens-bathrooms", "joinery"],
    location: "Phibsborough, Dublin 7",
    year: "2025 to 2026",
    architect: "Francesco Panzeri",
    flagship: true,
    summary:
      "A red brick house taken back to its structure, extended to the side and rear, and finished with a new kitchen, bathrooms and full height oak joinery.",
    intro: [
      "The architect's tender package set out a single storey side and rear extension and a complete renovation of the original house. We built it under a fixed price contract, from the first structural openings to handover.",
      "The work covered new foundations and blockwork, steel and roof structures, rooflights and large glazed openings, all services, a new kitchen and utility, bathrooms and a run of bespoke oak joinery through the living spaces and under the stairs.",
    ],
    scope: [
      "Single storey side and rear extension",
      "Structural openings, steels and new roof structures",
      "Full internal renovation and new services",
      "Kitchen, utility and bathrooms",
      "Bespoke oak joinery, living room and understairs",
    ],
    cover: "M83",
    designNote:
      "Drawings: Francesco Panzeri, architect. The four design visualisations were prepared from the architect's design and enhanced with AI by MF; they are design images, not photographs.",
    stages: [
      { stage: "before", text: "The original house with its side garage, before works began.", images: ["M119"] },
      {
        stage: "design",
        text: "The architect's tender drawings and design visualisations of the finished rooms.",
        images: ["M333", "M336", "M329", "M330", "M331", "M332"],
      },
      {
        stage: "construction",
        text: "The house stripped back, the extension shell formed and the rooflight openings framed.",
        images: ["M32", "M35", "M36", "M37", "M02", "M05"],
      },
      { stage: "bespoke", text: "Oak joinery for storage, display and the understairs space.", images: ["M89", "M90", "M93", "M94", "M88"] },
      {
        stage: "finished",
        text: "The finished extension, kitchen and bathrooms.",
        images: ["M83", "M84", "M85", "M86", "M87", "M91", "M92", "M95"],
      },
    ],
    pairs: [
      { design: "M332", built: "M86", caption: "Kitchen: design visualisation and the finished room" },
      { design: "M331", built: "M89", caption: "Living room joinery: design and built" },
      { design: "M330", built: "M83", caption: "Rear extension: design and built" },
      { design: "M336", built: "M87", caption: "Kitchen drawing and the finished kitchen" },
    ],
  },
  {
    slug: "clinic-fit-out-dublin-1",
    title: "Clinic design and fit-out, Dublin 1",
    sector: "Commercial",
    services: ["commercial", "interior-design", "joinery"],
    location: "Dublin 1",
    year: "2024",
    flagship: true,
    summary:
      "We designed the reception and waiting areas, drew the joinery and then built it: a slatted, illuminated reception desk, timber wall panelling and storage.",
    intro: [
      "The practice asked us for the interior design and the fit-out together. We prepared the layout, 3D views, finishes and lighting, and detailed drawings for the reception desk and panelling.",
      "The works followed the design closely. The photographs below show the design views beside the finished rooms.",
    ],
    scope: [
      "Layout and furniture plan",
      "3D design views, finishes and lighting",
      "Joinery drawings for the reception desk and panelling",
      "Fit-out of the reception and waiting areas",
      "Slatted timber panelling and feature column",
    ],
    cover: "M141",
    stages: [
      { stage: "before", text: "The existing corridor and glass block wall.", images: ["M133"] },
      {
        stage: "design",
        text: "Layout, 3D views and the reception desk details, prepared by MF.",
        images: ["M129", "M124", "M126", "M130"],
      },
      {
        stage: "construction",
        text: "The glass block wall enclosed and the desk carcass installed.",
        images: ["M134", "M136", "M137"],
      },
      { stage: "bespoke", text: "Slatted desk front, oak top and timber panelling.", images: ["M138", "M139", "M140"] },
      { stage: "finished", text: "The finished reception and waiting areas.", images: ["M141", "M142", "M143", "M148"] },
    ],
    pairs: [
      { design: "M124", built: "M141", caption: "Reception: 3D design view and the finished desk" },
      { design: "M130", built: "M138", caption: "Desk details and the desk as built" },
    ],
  },
  {
    slug: "restaurant-fit-out-dublin-2",
    title: "BAH33, restaurant fit-out, Royal Hibernian Way, Dublin 2",
    sector: "Commercial",
    services: ["commercial", "interior-design", "joinery"],
    location: "Royal Hibernian Way, Dublin 2",
    year: "2023 to 2025",
    flagship: true,
    summary:
      "Fit-out of a city centre restaurant: a glazed terrace enclosure and shopfront, kitchen layouts, a new bar and washrooms, and close-out with the design team.",
    intro: [
      "We have worked with BAH33 through several phases. The first created a glazed, covered terrace along the lane and a new shopfront, increasing the restaurant's capacity from about 26 to 80 seats.",
      "Later phases added a new bar with a slatted ceiling and washrooms with timber cladding, both designed by MF. Throughout, we worked with the design team on inspections, fire stopping and the documentation needed to close out the works.",
    ],
    scope: [
      "Glazed terrace enclosure and shopfront",
      "Commercial kitchen layouts",
      "Bar and washroom design and fit-out",
      "Coordination with the design team to close out the works",
    ],
    cover: "M159",
    stages: [
      {
        stage: "design",
        text: "Kitchen layouts and MF renders of the bar, ceiling and washrooms.",
        images: ["M149", "M150", "M304", "M305", "M307", "M306"],
      },
      { stage: "construction", text: "The terrace shopfront glazed and the fit-out under way.", images: ["M153", "M154"] },
      {
        stage: "finished",
        text: "The terrace, dining room and washrooms in use.",
        images: ["M157", "M159", "M156", "M160", "M168", "M170", "M169", "M164", "M165", "M163", "M166", "M167"],
      },
    ],
    pairs: [{ design: "M306", built: "M166", caption: "Washroom: MF render and the finished room" }],
  },
  {
    slug: "whole-house-renovation-rathcoole",
    title: "Whole house renovation and joinery, Rathcoole",
    sector: "Residential",
    services: ["whole-house", "extensions", "joinery", "kitchens-bathrooms", "interior-design"],
    location: "Rathcoole, Co. Dublin",
    year: "2025 to 2026",
    flagship: true,
    summary:
      "A rear extension, attic rooms and bathrooms, with bespoke joinery in almost every room: arched doors, eaves wardrobes, a dressing room island and panelled walls.",
    intro: [
      "This house was designed and built by MF. We produced 3D designs for the bathrooms, the attic dressing room and the joinery, then built the extension and fitted out the house.",
      "The joinery is what makes it: arched wardrobe doors, storage built into the eaves, a curved drawer unit with LED lighting and scalloped panelling.",
    ],
    scope: [
      "Rear extension with rooflights",
      "Attic rooms and dressing room",
      "Bathrooms and WC",
      "Bespoke joinery throughout",
      "3D design of bathrooms and joinery",
    ],
    cover: "M18",
    stages: [
      { stage: "design", text: "MF 3D designs for the bathrooms and joinery.", images: ["M316", "M319", "M320", "M315"] },
      { stage: "construction", text: "The new rear extension and bathroom works in progress.", images: ["M15", "M17"] },
      {
        stage: "bespoke",
        text: "Joinery made to fit each room.",
        images: ["M19", "M20", "M21", "M25", "M26", "M31", "M28"],
      },
      { stage: "finished", text: "Finished landing, stairs, bathrooms and bedrooms.", images: ["M18", "M23", "M24", "M29", "M30", "M27"] },
    ],
    pairs: [
      { design: "M316", built: "M29", caption: "Bathroom: MF design and the finished room" },
      { design: "M320", built: "M21", caption: "Dressing room joinery: design and built" },
    ],
  },
  {
    slug: "rear-extension-leixlip",
    title: "Rear extension and kitchen, Leixlip",
    sector: "Residential",
    services: ["extensions", "kitchens-bathrooms", "joinery"],
    location: "Leixlip, Co. Kildare",
    year: "2025",
    architect: "NBK Architects",
    summary:
      "A single storey rear extension with a standing seam roof and rooflights, opening the house to the garden, with a new kitchen island and built-in bookcases.",
    intro: [
      "Built to NBK Architects' construction drawings: a new rear extension with a standing seam lean-to roof, rooflights over the dining area and wide sliding doors to the garden.",
    ],
    scope: ["Rear extension and roof structure", "Rooflights and sliding doors", "Kitchen with island", "Built-in joinery"],
    cover: "M96",
    designNote: "Drawings: NBK Architects.",
    stages: [
      { stage: "design", text: "The architect's construction drawings.", images: ["M338", "M339", "M340", "M341"] },
      { stage: "construction", text: "Rooflight framing in the new extension.", images: ["M41"] },
      { stage: "finished", text: "The finished extension, kitchen and living room.", images: ["M96", "M97", "M99", "M98", "M100", "M42", "M43", "M44"] },
    ],
    pairs: [
      { design: "M338", built: "M42", caption: "Elevations and the finished extension" },
      { design: "M340", built: "M97", caption: "Kitchen drawing and the finished island" },
    ],
  },
  {
    slug: "bathrooms-interiors-leopardstown",
    title: "Bathrooms and interiors, Leopardstown",
    sector: "Residential",
    services: ["kitchens-bathrooms", "interior-design"],
    location: "Leopardstown, Dublin 18",
    year: "2025 to 2026",
    summary:
      "MF designed the bathroom and en-suite in 3D, then built them: stone look tile, brass fittings and a panelled hall and stair.",
    cover: "M101",
    stages: [
      { stage: "design", text: "MF 3D views of the bathroom and en-suite.", images: ["M311", "M312"] },
      { stage: "finished", text: "The finished en-suite, shower and hall.", images: ["M101", "M102", "M103", "M76", "M77", "M104"] },
    ],
    pairs: [{ design: "M312", built: "M102", caption: "En-suite: MF design and the finished shower" }],
  },
  {
    slug: "our-garden-dwelling",
    title: "Our own garden dwelling",
    sector: "Residential",
    services: ["garden-buildings"],
    location: "Built for our founder",
    year: "2025",
    summary:
      "A clad garden dwelling built by MF at our founder's home, with a kitchenette, shower room, bunk room and built-in storage.",
    cover: "M50",
    stages: [{ stage: "finished", images: ["M50", "M52", "M53", "M55"] }],
  },
  {
    slug: "kitchen-living-renovation",
    title: "Kitchen and living room renovation",
    sector: "Residential",
    services: ["kitchens-bathrooms"],
    location: "Dublin area",
    year: "2026",
    summary: "A new kitchen with an island and tall units, a living room with a brick slip wall and a glazed partition to the dining area.",
    cover: "M69",
    stages: [{ stage: "finished", images: ["M69", "M70", "M71", "M73", "M72", "M68"] }],
  },
  {
    slug: "outdoor-room-ashbourne",
    title: "Outdoor room and kitchen, Ashbourne",
    sector: "Residential",
    services: ["outdoor-living"],
    location: "Ashbourne, Co. Meath",
    year: "2025",
    summary: "A covered outdoor room with glass sliding panels and a built-in barbecue, built from the blockwork up.",
    cover: "M60",
    stages: [
      { stage: "before", images: ["M58"] },
      { stage: "construction", images: ["M59"] },
      { stage: "finished", images: ["M60", "M61"] },
    ],
  },
  {
    slug: "glass-fronted-garden-room-louth",
    title: "Glass fronted garden room, Co. Louth",
    sector: "Residential",
    services: ["garden-buildings", "outdoor-living"],
    location: "Blackrock, Co. Louth",
    year: "2026",
    summary: "A glass fronted garden room with a new porcelain patio.",
    cover: "M62",
    stages: [
      { stage: "construction", images: ["M64"] },
      { stage: "finished", images: ["M62", "M63"] },
    ],
  },
  {
    slug: "attic-conversions",
    title: "Attic conversions and en-suites",
    sector: "Residential",
    services: ["extensions"],
    location: "Dublin and Meath",
    year: "2023 to 2024",
    summary: "New attic stairs, rooflights and shower rooms, turning roof space into bedrooms and studies.",
    cover: "M189",
    stages: [
      { stage: "construction", images: ["M190"] },
      { stage: "finished", images: ["M189", "M188", "M192", "M193"] },
    ],
  },
  {
    slug: "kitchen-extensions",
    title: "Kitchen extensions with rooflights",
    sector: "Residential",
    services: ["extensions", "kitchens-bathrooms"],
    location: "Dublin area",
    year: "2023 to 2024",
    summary: "Open plan kitchens under new rooflights, with islands, fluted details and feature walls.",
    cover: "M198",
    stages: [
      { stage: "design", text: "An MF 3D kitchen design, and the kitchen as built.", images: ["M203"] },
      { stage: "finished", images: ["M198", "M199", "M200", "M201", "M202"] },
    ],
    pairs: [{ design: "M203", built: "M202", caption: "Kitchen: MF 3D design and the finished kitchen" }],
  },
  {
    slug: "glazed-garden-room",
    title: "Glazed garden room with timber pergola",
    sector: "Residential",
    services: ["garden-buildings", "outdoor-living"],
    location: "Dublin area",
    year: "2024",
    summary: "A glazed garden room under a timber pergola, set on a porcelain terrace.",
    cover: "M177",
    stages: [{ stage: "finished", images: ["M177", "M178", "M179"] }],
  },
  {
    slug: "garden-dwelling-interiors",
    title: "Garden dwelling interior",
    sector: "Residential",
    services: ["garden-buildings"],
    location: "Dublin area",
    year: "2023",
    summary: "A self-contained garden dwelling with a bedroom, built-in wardrobes, shower room and kitchenette.",
    cover: "M194",
    stages: [{ stage: "finished", images: ["M194", "M195", "M196", "M197"] }],
  },
  {
    slug: "outdoor-rooms-and-canopies",
    title: "Outdoor rooms, glass rooms and canopies",
    sector: "Residential",
    services: ["outdoor-living"],
    location: "Dublin and Meath",
    year: "2023 to 2024",
    summary: "Timber framed outdoor rooms with kitchens, glass rooms and steel canopies over new patios.",
    cover: "M173",
    stages: [
      { stage: "construction", images: ["M171", "M172"] },
      { stage: "finished", images: ["M173", "M174", "M184", "M185", "M186", "M187"] },
    ],
  },
];

export const findCase = (slug?: string) => caseStudies.find((c) => c.slug === slug);
export const casesFor = (service: ServiceKey) => caseStudies.filter((c) => c.services.includes(service));
