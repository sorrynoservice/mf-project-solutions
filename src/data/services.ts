import {
  Award,
  ChefHat,
  CircleCheck,
  Clock,
  Droplets,
  Euro,
  Eye,
  Heart,
  House,
  Leaf,
  Lightbulb,
  MapPin,
  MessageSquare,
  Palette,
  Ruler,
  Sofa,
  Sparkles,
  Sun,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<string, LucideIcon> = {
  "award": Award,
  "chef-hat": ChefHat,
  "circle-check": CircleCheck,
  "clock": Clock,
  "droplets": Droplets,
  "euro": Euro,
  "eye": Eye,
  "heart": Heart,
  "house": House,
  "leaf": Leaf,
  "lightbulb": Lightbulb,
  "map-pin": MapPin,
  "message-square": MessageSquare,
  "palette": Palette,
  "ruler": Ruler,
  "sofa": Sofa,
  "sparkles": Sparkles,
  "sun": Sun,
  "trees": Trees,
  "users": Users,
};

export const services = {
  "bathroom-renovations": {
    "footerTagline": "Bathroom Renovations & Construction",
    "blocks": [
      {
        "type": "transform",
        "heading": "Transform Your Bathroom",
        "paras": [
          "A bathroom renovation can completely transform your daily routine. Whether you want a spa-like retreat, a modern ensuite, or a family-friendly space, we create bathrooms that combine stunning aesthetics with practical functionality.",
          "We handle all aspects including plumbing, tiling, electrical work, and finishing touches. Every renovation is completed with premium materials and expert craftsmanship."
        ],
        "media": {
          "type": "video",
          "src": "/assets/bathroom-renovations-transform-720.mp4"
        }
      },
      {
        "type": "benefits",
        "heading": "Why Renovate Your Bathroom?",
        "sub": "Create a luxury sanctuary that enhances your daily routine",
        "cards": [
          {
            "icon": "droplets",
            "title": "Luxury & Comfort",
            "text": "Transform your daily routine with premium fixtures, rainfall showers, and spa-like features"
          },
          {
            "icon": "sparkles",
            "title": "Modern Design",
            "text": "Contemporary aesthetics with timeless appeal, featuring the latest trends in bathroom design"
          },
          {
            "icon": "clock",
            "title": "Efficient Installation",
            "text": "Most bathroom renovations completed in 2-3 weeks with minimal disruption"
          }
        ]
      },
      {
        "type": "features",
        "image": "/assets/bathroom-renovations-premium-CZSvMO58.jpg",
        "alt": "Bathroom interior",
        "heading": "Premium Features",
        "items": [
          "High-end sanitaryware and fixtures",
          "Premium tiles and stone surfaces",
          "Walk-in showers and luxury bathtubs",
          "Underfloor heating systems",
          "LED mood lighting and mirrors",
          "Smart storage solutions",
          "Water-efficient fittings",
          "12 month workmanship guarantee"
        ]
      },
      {
        "type": "work",
        "heading": "Our Work",
        "sub": "Quality craftsmanship in every project",
        "images": [
          {
            "src": "/assets/bathroom-renovations-work-2-new-COyQH2GO.jpg",
            "alt": "Bathroom project 2"
          },
          {
            "src": "/assets/bathroom-renovations-work-1-new-C4GPBOqc.jpg",
            "alt": "Bathroom project 1"
          },
          {
            "src": "/assets/bathroom-renovations-work-3-DGUuFp27.jpg",
            "alt": "Bathroom project 3"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "How long does a bathroom renovation take?",
            "a": "Typically 2-3 weeks from start to finish, depending on the scope of work and material availability."
          },
          {
            "q": "Can I use my bathroom during renovation?",
            "a": "The bathroom will be out of use during the main installation phase. We work efficiently to minimize downtime."
          },
          {
            "q": "What's included in the price?",
            "a": "All labor, materials, plumbing, electrical work, tiling, and finishing. We provide detailed quotes with no hidden costs."
          },
          {
            "q": "Do you offer design services?",
            "a": "Yes. We plan the layout with you and help you choose tiles, fixtures and finishes before any work starts."
          },
          {
            "q": "What guarantee do you give?",
            "a": "12 months on our workmanship from handover: if a defect in our work shows up in that time, we come back and fix it at no cost. Products and materials carry their manufacturers' guarantees, which we pass to you in writing at handover. This is on top of your rights under consumer law."
          },
          {
            "q": "Can you work with my existing layout?",
            "a": "Yes, we can work within your current layout or reconfigure the space for better functionality if needed."
          }
        ]
      }
    ],
    "heroImage": "/assets/bathroom-renovations-hero-new-C7-melRI.jpg",
    "heroAlt": "Renovated bathroom with walk-in shower",
    "title": "Bathroom Renovations in Dublin & Meath",
    "formType": "Bathroom",
    "intro": "Full bathroom and ensuite renovations across Dublin, Meath, Louth, Kildare and Wicklow. Design, plumbing, tiling and finishing handled by one team, with one point of contact from start to finish.",
    "ctaLabel": "Request a free site visit",
    "contactHeading": "Ready for Your Dream Bathroom?",
    "contactSub": "Tell us about your project and we'll arrange a free site visit",
    "contactNote": "Quick response for consultations and quotes"
  },
  "garden-rooms": {
    "footerTagline": "Garden Rooms & Construction",
    "blocks": [
      {
        "type": "transform",
        "heading": "Transform Your Garden",
        "paras": [
          "A garden room adds valuable space without the complexity of a full extension. Whether you need a home office, gym, studio or hobby room, we build bespoke garden rooms across Dublin, Meath, Louth, Kildare and Wicklow that sit comfortably with your home.",
          "Every garden room is fully insulated, double glazed and wired, and we handle the groundwork and finishing so you get a turnkey result. Want a room to live or sleep in? See our granny flats page."
        ],
        "media": {
          "type": "video",
          "src": "/assets/garden-rooms-transform-720.mp4"
        }
      },
      {
        "type": "benefits",
        "heading": "Why Choose a Garden Room?",
        "sub": "A smart investment that adds space, value, and versatility to your home",
        "cards": [
          {
            "icon": "house",
            "title": "Extra Living Space",
            "text": "Create additional room for work, hobbies, or relaxation without moving house"
          },
          {
            "icon": "sparkles",
            "title": "Quick Installation",
            "text": "Fully completed within 6-8 weeks from start to finish with minimal disruption"
          },
          {
            "icon": "euro",
            "title": "Add Property Value",
            "text": "Increase your home's value with a high-quality permanent structure"
          }
        ]
      },
      {
        "type": "features",
        "image": "/assets/projects/garden-room-during-build.jpg",
        "alt": "Garden room during the build, insulated timber frame and OSB lining",
        "heading": "Premium Features Included",
        "items": [
          "Full insulation for year-round comfort",
          "Double-glazed windows and doors",
          "Complete electrical installation with sockets and lighting",
          "High-quality interior finishing",
          "Durable external cladding",
          "Groundwork and foundation preparation",
          "Planning assistance if required",
          "Project management from start to finish"
        ]
      },
      {
        "type": "work",
        "heading": "Our Work",
        "sub": "Quality craftsmanship in every project",
        "images": [
          {
            "src": "/assets/projects/garden-room-astro-stepping-stones.jpg",
            "alt": "Clad garden room with artificial grass and stepping stones"
          },
          {
            "src": "/assets/projects/garden-office-dusk-lighting.jpg",
            "alt": "Garden office at dusk with path lighting"
          },
          {
            "src": "/assets/projects/garden-room-and-sauna-timber-clad.jpg",
            "alt": "Timber clad garden room and sauna"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "Do I need planning permission?",
            "a": "Since July 2026, garden rooms up to 30mÂ² (previously 25mÂ²) are exempt from planning permission if they are used as a home office, gym, studio or similar, not as living accommodation. The room must be behind the front wall of the house, no higher than 4m with a pitched roof or 3m with a flat roof, and you must keep at least 25mÂ² of rear garden. Existing sheds count towards the 30mÂ². Every site is different, so we check your property against all the conditions at the first site visit."
          },
          {
            "q": "How long does it take?",
            "a": "Typically 6-8 weeks from initial consultation to completion, depending on size and complexity."
          },
          {
            "q": "What sizes do you build?",
            "a": "From compact 12mÂ² offices up to 30mÂ² without planning permission. For a self-contained garden dwelling with a bedroom, kitchen and shower room, the new rules allow 32mÂ² to 45mÂ² without planning, subject to conditions. Anything larger needs planning permission, which we can handle for you."
          },
          {
            "q": "Is heating included?",
            "a": "We provide full insulation. Heating options can be added based on your preference and budget."
          },
          {
            "q": "What about water and plumbing?",
            "a": "Plumbing can be added for an additional cost if you need a kitchenette or bathroom facilities."
          },
          {
            "q": "What guarantee do you give?",
            "a": "12 months on our workmanship from handover: if a defect in our work shows up in that time, we come back and fix it at no cost. Products and materials carry their manufacturers' guarantees, which we pass to you in writing at handover. This is on top of your rights under consumer law."
          }
        ]
      }
    ],
    "heroImage": "/assets/projects/garden-room-dark-clad-sunset.jpg",
    "heroAlt": "Insulated garden room built by MF Project Solutions",
    "title": "Garden Rooms in Dublin & Meath",
    "formType": "Garden room",
    "intro": "Bespoke garden rooms for home offices, studios, gyms and hobby spaces across Dublin, Meath, Louth, Kildare and Wicklow. Fully insulated, wired and finished by our own team, and up to 30mÂ² without planning permission.",
    "ctaLabel": "Request a free site visit",
    "contactHeading": "Ready to Transform Your Garden?",
    "contactSub": "Tell us about your project and we'll arrange a free site visit",
    "contactNote": "Quick response for consultations and quotes"
  },
  "granny-flats": {
    "footerTagline": "Granny Flats & Garden Dwellings",
    "blocks": [
      {
        "type": "transform",
        "heading": "Space for family, close to home",
        "paras": [
          "A detached garden dwelling gives family members their own space with a bedroom, bathroom, kitchen and living area, while staying close to home. Under the new rules in force since 27 July 2026, many can now be built without planning permission.",
          "We design, notify the council, build and hand over, all with our own team, across Dublin, Meath, Louth, Kildare and Wicklow."
        ],
        "media": {
          "type": "image",
          "src": "/assets/projects/granny-flat-clad-aerial.jpg",
          "alt": "Clad garden dwelling with patio and artificial grass"
        }
      },
      {
        "type": "features",
        "image": "/assets/projects/granny-flat-rendered-flat-roof.jpg",
        "alt": "Rendered garden dwelling with rooflights and patio",
        "heading": "The new planning exemption (Class 3A)",
        "items": [
          "Floor area between 32mÂ² and 45mÂ², including any other sheds or garden structures",
          "Height up to 4m with a pitched roof, or 3m with a flat roof",
          "At least 0.6m from the boundary, and at least 25mÂ² of rear garden kept for the main house",
          "Water, drainage and electricity connected through the main house, no separate connections",
          "Used together with the main house, which must be the owner's home. It cannot be sold or let separately, and short term letting such as Airbnb is not allowed",
          "No new entrance onto the road",
          "The council must be notified at least 14 days before work starts",
          "Applies to units started and completed by 31 December 2030"
        ]
      },
      {
        "type": "benefits",
        "heading": "Good to know",
        "sub": "Every site is different. We check your property against all the conditions at the first site visit.",
        "cards": [
          {
            "icon": "ruler",
            "title": "Under 32mÂ²?",
            "text": "A garden unit under 32mÂ² with a bedroom does not qualify for this exemption and needs planning permission."
          },
          {
            "icon": "circle-check",
            "title": "Building Regulations",
            "text": "Building Regulations still apply to every unit, including fire safety, insulation and ventilation. We build to them on every project."
          },
          {
            "icon": "map-pin",
            "title": "Planning if needed",
            "text": "If your design falls outside the exemption, we can prepare and manage the planning application for you."
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "Do I need planning permission?",
            "a": "Not if the unit meets all the Class 3A conditions above, including the 32mÂ² to 45mÂ² size range and the council notification 14 days before work starts. If it doesn't, we can manage a planning application."
          },
          {
            "q": "Can I rent it out?",
            "a": "Not separately from the house. The unit must be used together with the main house, and short term letting is not allowed."
          },
          {
            "q": "Can it have a kitchen and bathroom?",
            "a": "Yes. That is the point of this exemption: a self-contained unit with a bedroom, bathroom, kitchen and living area, with services connected through the main house."
          },
          {
            "q": "How long does it take?",
            "a": "It depends on the size, specification and site access. We give you a programme with the quote after the site visit."
          },
          {
            "q": "What does it cost?",
            "a": "Every site is different, particularly for groundworks and service connections. We give a fixed, itemised quote after a free site visit."
          },
          {
            "q": "Is my garden big enough?",
            "a": "You must keep at least 25mÂ² of rear garden for the main house after the build. We measure this at the site visit."
          }
        ]
      }
    ],
    "heroImage": "/assets/projects/granny-flat-clad-front.jpg",
    "heroAlt": "Garden dwelling built by MF Project Solutions",
    "title": "Granny Flats & Garden Dwellings in Dublin & Meath",
    "formType": "Granny flat",
    "intro": "Detached garden dwellings from 32mÂ² to 45mÂ² with a bedroom, bathroom, kitchen and living area. Since July 2026 many can be built without planning permission, and we handle design, council notification and the build.",
    "ctaLabel": "Request a free site visit",
    "contactHeading": "Planning a granny flat?",
    "contactSub": "Tell us about your site and we'll check it against the new rules",
    "contactNote": "Quick response for site visits and quotes"
  },
  "home-extensions": {
    "footerTagline": "Home Extensions & Construction",
    "blocks": [
      {
        "type": "benefits",
        "heading": "Why Extend Your Home?",
        "sub": "A smart investment that adds space, value, and versatility to your property",
        "cards": [
          {
            "icon": "ruler",
            "title": "More Living Space",
            "text": "Add valuable square footage without the stress and expense of moving to a new property"
          },
          {
            "icon": "users",
            "title": "Growing Families",
            "text": "Perfect solution for expanding families needing extra bedrooms, play areas, or home offices"
          },
          {
            "icon": "award",
            "title": "Increase Property Value",
            "text": "Add the space you need without the cost and upheaval of moving house"
          }
        ]
      },
      {
        "type": "transform",
        "heading": "Expand Your Living Space",
        "paras": [
          "A home extension adds valuable square footage without the stress and expense of moving. Whether you need extra bedrooms, a larger kitchen, or an open-plan living area, we create extensions that integrate seamlessly with your existing home.",
          "We can work from your architect's drawings or arrange the design and planning for you, then deliver the structural work and finishes with our own team."
        ],
        "media": {
          "type": "image",
          "src": "/assets/projects/extension-interior-rooflight.jpg",
          "alt": "Extension interior with rooflight and bifold doors"
        }
      },
      {
        "type": "benefits",
        "heading": "Our Process",
        "sub": "From initial consultation to final handover, we manage every detail",
        "cards": [
          {
            "icon": "message-square",
            "title": "1. Site Survey",
            "text": "Comprehensive assessment of your property and feasibility study for the extension"
          },
          {
            "icon": "map-pin",
            "title": "2. Design & Planning",
            "text": "Architectural plans, planning permission assistance, and detailed costings"
          },
          {
            "icon": "house",
            "title": "3. Construction",
            "text": "Professional build with regular updates, quality materials, and skilled tradespeople"
          },
          {
            "icon": "circle-check",
            "title": "4. Finishing",
            "text": "Interior completion, final inspections, and seamless integration with existing home"
          }
        ],
        "nested": {
          "image": "/assets/home-extensions-deliver-Cmiq2x-d.jpg",
          "alt": "Extension interior",
          "heading": "What We Deliver",
          "items": [
            "Design and planning drawings, in house or with your architect",
            "Planning permission assistance",
            "Structural engineering calculations",
            "High-quality materials and finishes",
            "Project management from start to finish",
            "Building Regulations compliance, with certification by your assigned certifier where required",
            "12 month workmanship guarantee",
            "Seamless integration with existing property"
          ]
        }
      },
      {
        "type": "work",
        "heading": "Our Work",
        "sub": "Quality craftsmanship in every project",
        "images": [
          {
            "src": "/assets/projects/extension-rear-zinc-fascia.jpg",
            "alt": "Rendered rear extension with zinc fascia"
          },
          {
            "src": "/assets/projects/extension-frameless-glass.jpg",
            "alt": "Rear extension with frameless glass sliding wall"
          },
          {
            "src": "/assets/home-extensions-work-2-Dp4o_904.jpg",
            "alt": "Rear extension with bifold doors open"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "Do I need planning permission for an extension?",
            "a": "Since July 2026, rear extensions up to 45mÂ² (previously 40mÂ²) can be built without planning permission, subject to conditions on height, boundaries and remaining garden space. Side and rear dormer roof extensions are also now exempt in many cases. Larger or front extensions need planning permission, which we manage for you. Every site is different, so we check your property at the first site visit."
          },
          {
            "q": "How long does it take?",
            "a": "Typically 12-16 weeks from planning approval to completion, depending on size and complexity of the extension."
          },
          {
            "q": "Can I live in my home during construction?",
            "a": "Yes, we take steps to minimize disruption. We'll discuss the best approach during consultation to keep your home functional."
          },
          {
            "q": "How much does an extension cost?",
            "a": "It depends on size, structure (steels and openings), ground conditions, and the kitchen and finishes you choose, so a price per mÂ² can be misleading. Our quantity surveyors give you a fixed, itemised quote after the free site visit, so you can see what every part costs."
          },
          {
            "q": "Do you handle structural engineering?",
            "a": "Yes, we work with certified structural engineers to ensure all calculations and certifications are completed properly."
          },
          {
            "q": "What guarantee do you give?",
            "a": "12 months on our workmanship from handover: if a defect in our work shows up in that time, we come back and fix it at no cost. Products and materials carry their manufacturers' guarantees, which we pass to you in writing at handover. This is on top of your rights under consumer law."
          }
        ]
      }
    ],
    "heroImage": "/assets/projects/extension-standing-seam-roof.jpg",
    "heroAlt": "Open plan home extension",
    "title": "Home Extensions in Dublin & Meath",
    "formType": "Extension",
    "intro": "Rear and side extensions across Dublin, Meath, Louth, Kildare and Wicklow, designed to sit naturally with your existing home. Up to 45mÂ² can now be built without planning permission, and we manage larger schemes from planning to handover.",
    "ctaLabel": "Request a free site visit",
    "contactHeading": "Ready to Expand Your Home?",
    "contactSub": "Tell us about your project and we'll arrange a free site visit",
    "contactNote": "Quick response for consultations and quotes"
  },
  "interior-design": {
    "footerTagline": "Refurbishments & Fit Outs",
    "blocks": [
      {
        "type": "benefits",
        "heading": "Why Choose Us for Your Refurbishment?",
        "sub": "One team, a clear plan and joinery from our own workshop",
        "cards": [
          {
            "icon": "users",
            "title": "One Team, One Contact",
            "text": "Our own crew and managed specialist trades, coordinated by one project lead"
          },
          {
            "icon": "clock",
            "title": "Planned in Stages",
            "text": "A clear programme so you know what happens each week and when rooms are back in use"
          },
          {
            "icon": "ruler",
            "title": "Workshop Joinery",
            "text": "Wardrobes, storage and panelling made in our own workshop in Drumree"
          }
        ]
      },
      {
        "type": "transform",
        "heading": "Refurbish Without the Guesswork",
        "paras": [
          "A full refurbishment touches every trade in the house. We survey the property, set out the scope room by room and give you an itemised quote, so you know exactly what is included.",
          "Our team strips out, rebuilds and finishes, with registered electricians and plumbers managed by us, and a snag check before handover."
        ],
        "media": {
          "type": "image",
          "src": "/assets/home-extensions-work-3-Pz2e_WY6.jpg",
          "alt": "Refurbished interior by MF Project Solutions"
        },
        "ctaLabel": "Get a quote"
      },
      {
        "type": "benefits",
        "heading": "Our Process",
        "sub": "From survey to handover, we manage every detail",
        "cards": [
          {
            "icon": "ruler",
            "title": "1. Survey and Scope",
            "text": "We measure every room and agree what needs to change"
          },
          {
            "icon": "euro",
            "title": "2. Itemised Quote",
            "text": "Every item and exclusion listed, with a programme"
          },
          {
            "icon": "house",
            "title": "3. Build in Stages",
            "text": "Strip out, first fix, plastering, second fix and finishes"
          },
          {
            "icon": "circle-check",
            "title": "4. Handover",
            "text": "A walkthrough and snag check before we hand back the keys"
          }
        ],
        "nested": {
          "image": "/assets/home-extensions-living-space-ty_IPVMB.jpg",
          "alt": "Refurbished living space",
          "heading": "What We Deliver",
          "items": [
            "Strip out and making good",
            "Electrical and plumbing upgrades by registered trades",
            "Plastering and new ceilings",
            "Flooring, doors and skirting",
            "Bespoke joinery and fitted wardrobes",
            "Kitchens and bathrooms",
            "Insulation and energy upgrades",
            "Snag check before handover"
          ]
        }
      },
      {
        "type": "work",
        "heading": "Our Work",
        "sub": "Quality craftsmanship in every project",
        "images": [
          {
            "src": "/assets/home-extensions-work-1-CkYlBiXD.jpg",
            "alt": "Kitchen and dining space"
          },
          {
            "src": "/assets/kitchen-renovations-work-2-Dq89EN1Q.jpg",
            "alt": "Fitted kitchen"
          },
          {
            "src": "/assets/bathroom-renovations-hero-new-C7-melRI.jpg",
            "alt": "Renovated bathroom"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "How long does a full refurbishment take?",
            "a": "It depends on the size of the house and the scope. We give you a programme with your quote."
          },
          {
            "q": "Can we live in the house during the works?",
            "a": "For partial refurbishments, usually yes. For a full strip out it is often faster and safer to move out for part of the programme. We will advise at the survey."
          },
          {
            "q": "Do you do painting?",
            "a": "Painting is limited to white walls, ceilings and woodwork where it is included in the quote. For colours we can recommend a decorator."
          },
          {
            "q": "Do you handle electrics and plumbing?",
            "a": "Yes, through registered electricians and plumbers managed by us, with certificates at handover."
          },
          {
            "q": "What guarantee do you give?",
            "a": "12 months on our workmanship from handover: if a defect in our work shows up in that time, we come back and fix it at no cost. Products and materials carry their manufacturers' guarantees, which we pass to you in writing at handover. This is on top of your rights under consumer law."
          }
        ]
      }
    ],
    "heroImage": "/assets/projects/extension-interior-rooflight.jpg",
    "heroAlt": "Refurbished interior with rooflight",
    "title": "Refurbishments & Fit Outs in Dublin",
    "formType": "Full renovation",
    "intro": "Whole house refurbishments and interior fit outs in Dublin and the surrounding counties, planned and delivered by our own team with one point of contact from survey to handover.",
    "ctaLabel": "Request a free site visit",
    "contactHeading": "Planning a Refurbishment?",
    "contactSub": "Tell us about your project and we'll arrange a free site visit",
    "contactNote": "Quick response for consultations and quotes"
  },
  "kitchen-renovations": {
    "footerTagline": "Kitchen Renovations & Construction",
    "blocks": [
      {
        "type": "benefits",
        "heading": "Why Renovate Your Kitchen?",
        "sub": "Transform the heart of your home into a space you'll love",
        "cards": [
          {
            "icon": "chef-hat",
            "title": "Built Around How You Cook",
            "text": "Layout, storage and worktops planned around how you actually use your kitchen"
          },
          {
            "icon": "lightbulb",
            "title": "Smart Design",
            "text": "Innovative storage solutions and ergonomic layouts that maximize functionality"
          },
          {
            "icon": "heart",
            "title": "Heart of the Home",
            "text": "Create a welcoming space where family and friends naturally gather and connect"
          }
        ]
      },
      {
        "type": "transform",
        "heading": "Create Your Dream Kitchen",
        "paras": [
          "The kitchen is the heart of your home. Whether you're a passionate cook or love to entertain, we create kitchens that blend beautiful design with optimal functionality, tailored to your cooking style and lifestyle needs.",
          "From bespoke cabinetry made in our own workshop to worktops and appliances, we handle every part of your kitchen renovation."
        ],
        "media": {
          "type": "image",
          "src": "/assets/kitchen-renovations-work-3-AnHYCzKu.jpg",
          "alt": "Fitted kitchen by MF Project Solutions"
        }
      },
      {
        "type": "benefits",
        "heading": "Our Process",
        "sub": "From initial consultation to final handover, we manage every detail",
        "cards": [
          {
            "icon": "message-square",
            "title": "1. Design Discovery",
            "text": "Understanding your cooking style, storage needs, and aesthetic preferences"
          },
          {
            "icon": "map-pin",
            "title": "2. Layout Planning",
            "text": "Layout drawings, material selection and appliance advice for a practical workflow"
          },
          {
            "icon": "house",
            "title": "3. Expert Installation",
            "text": "Professional fitting of cabinetry, worktops, appliances, and all finishes"
          },
          {
            "icon": "circle-check",
            "title": "4. Perfect Finish",
            "text": "Final touches, quality inspections, and your dream kitchen ready to enjoy"
          }
        ],
        "nested": {
          "image": "/assets/kitchen-renovations-premium-Dzh9VSz6.jpg",
          "alt": "Kitchen interior",
          "heading": "Premium Kitchen Features",
          "items": [
            "Custom cabinetry and storage solutions",
            "Quartz, granite, or marble worktops",
            "Premium integrated appliances",
            "Designer lighting and ventilation",
            "Innovative organization systems",
            "High-quality taps and fixtures",
            "Durable, beautiful flooring options",
            "12 month workmanship guarantee"
          ]
        }
      },
      {
        "type": "work",
        "heading": "Our Work",
        "sub": "Quality craftsmanship in every project",
        "images": [
          {
            "src": "/assets/kitchen-renovations-work-1-C6e7Fqc8.jpg",
            "alt": "Kitchen project 1"
          },
          {
            "src": "/assets/kitchen-renovations-work-2-Dq89EN1Q.jpg",
            "alt": "Kitchen project 2"
          },
          {
            "src": "/assets/kitchen-renovations-work-3-AnHYCzKu.jpg",
            "alt": "Kitchen project 3"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "How long does a kitchen renovation take?",
            "a": "Typically 4-6 weeks from start to finish, depending on the scope of work and material availability."
          },
          {
            "q": "Can I use my kitchen during renovation?",
            "a": "We'll work with you to minimize disruption, but typically you'll need alternative cooking arrangements during the main installation phase."
          },
          {
            "q": "Do you handle all aspects of the renovation?",
            "a": "Yes, we manage everything from design to installation, including plumbing, electrical, and finishing work."
          },
          {
            "q": "What's included in the price?",
            "a": "All labor, materials, cabinetry, worktops, and installation. We provide detailed quotes with no hidden costs."
          },
          {
            "q": "How do payments work?",
            "a": "Payments are staged: a deposit to book your start date, then instalments as the work progresses. The full schedule is set out in your quote before you commit."
          },
          {
            "q": "What guarantee do you give?",
            "a": "12 months on our workmanship from handover: if a defect in our work shows up in that time, we come back and fix it at no cost. Products and materials carry their manufacturers' guarantees, which we pass to you in writing at handover. This is on top of your rights under consumer law."
          }
        ]
      }
    ],
    "heroImage": "/assets/kitchen-renovations-work-2-Dq89EN1Q.jpg",
    "heroAlt": "Modern fitted kitchen",
    "title": "Kitchen Renovations in Dublin & Meath",
    "formType": "Kitchen",
    "intro": "Kitchen supply and fit across Dublin, Meath, Louth, Kildare and Wicklow, with bespoke joinery made in our own workshop in Drumree, Co. Meath.",
    "ctaLabel": "Request a free site visit",
    "contactHeading": "Ready for Your Dream Kitchen?",
    "contactSub": "Tell us about your project and we'll arrange a free site visit",
    "contactNote": "Quick response for consultations and quotes"
  },
  "landscaping-pergolas": {
    "footerTagline": "Landscaping & Pergolas",
    "blocks": [
      {
        "type": "benefits",
        "heading": "Why Invest in Landscaping?",
        "sub": "Create an outdoor paradise that extends your living space",
        "cards": [
          {
            "icon": "trees",
            "title": "Professional Design",
            "text": "Bespoke landscaping plans tailored to your space, lifestyle, and aesthetic preferences"
          },
          {
            "icon": "sun",
            "title": "Year-Round Beauty",
            "text": "Carefully selected plants and materials that look stunning throughout all seasons"
          },
          {
            "icon": "leaf",
            "title": "Low Maintenance",
            "text": "Sustainable landscaping solutions designed for easy care and long-lasting beauty"
          }
        ]
      },
      {
        "type": "transform",
        "heading": "Transform Your Outdoor Space",
        "paras": [
          "Professional landscaping and custom pergolas can completely transform your outdoor living experience. Whether you want an elegant entertaining area, a peaceful retreat, or a functional family space, we create outdoor environments that enhance your lifestyle.",
          "We handle everything from design to installation, using quality materials and expert craftsmanship to ensure your outdoor space looks stunning year-round."
        ],
        "media": {
          "type": "video",
          "src": "/assets/landscaping-pergolas-transform-720.mp4"
        }
      },
      {
        "type": "benefits",
        "heading": "Our Process",
        "sub": "From initial consultation to final handover, we manage every detail",
        "cards": [
          {
            "icon": "message-square",
            "title": "1. Site Assessment",
            "text": "We evaluate your outdoor space, soil conditions, drainage, and sun exposure"
          },
          {
            "icon": "map-pin",
            "title": "2. Design Concept",
            "text": "Custom landscape plans with plant selections, hardscaping, and pergola designs"
          },
          {
            "icon": "house",
            "title": "3. Installation",
            "text": "Expert craftsmen bring your outdoor vision to life with quality materials"
          },
          {
            "icon": "leaf",
            "title": "4. Handover",
            "text": "A walkthrough of the finished work and care instructions for your new outdoor space"
          }
        ],
        "nested": {
          "image": "/assets/landscaping-pergolas-services-xWOdgI1v.jpg",
          "alt": "Landscaping interior",
          "heading": "Services Included",
          "items": [
            "Custom pergola design and construction",
            "Patio and deck installation",
            "Garden bed design and planting",
            "Lawn preparation and turfing",
            "Water features and lighting",
            "Fencing and privacy screens",
            "Outdoor seating and fire pits",
            "12 month workmanship guarantee"
          ]
        }
      },
      {
        "type": "calculatorCta",
        "heading": "Get an Instant Estimate",
        "sub": "Use our online Garden Renovation Calculator to build your project, see instant pricing, and request a confirmed quote.",
        "buttonLabel": "Open Calculator",
        "href": "/garden-calculator"
      },
      {
        "type": "work",
        "heading": "Our Work",
        "sub": "Quality craftsmanship in every project",
        "images": [
          {
            "src": "/assets/landscaping-pergolas-work-1-Bgtc6H-i.jpg",
            "alt": "Timber pergola over a patio"
          },
          {
            "src": "/assets/projects/patio-porcelain-garden-shed.jpg",
            "alt": "Porcelain patio with gravel path and planting"
          },
          {
            "src": "/assets/projects/garden-store-glass-front-dusk.jpg",
            "alt": "Glass fronted garden store with porcelain patio at dusk"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "How long does a landscaping project take?",
            "a": "Typically 4-8 weeks depending on the scope, weather conditions, and size of your outdoor space."
          },
          {
            "q": "Can you work with existing features?",
            "a": "Absolutely. We can incorporate existing trees, structures, or features into the new design or suggest improvements."
          },
          {
            "q": "What materials do you use for pergolas?",
            "a": "We build pergolas in quality timber or composite, depending on the look you want and your budget."
          },
          {
            "q": "Do you provide a design?",
            "a": "Yes. We draw up a layout for your garden with materials and levels agreed before work starts."
          },
          {
            "q": "What guarantee do you give?",
            "a": "12 months on our workmanship from handover: if a defect in our work shows up in that time, we come back and fix it at no cost. Products and materials carry their manufacturers' guarantees, which we pass to you in writing at handover. This is on top of your rights under consumer law."
          }
        ]
      }
    ],
    "heroImage": "/assets/projects/garden-room-astro-stepping-stones.jpg",
    "heroAlt": "Landscaped garden with pergola",
    "title": "Landscaping, Patios & Pergolas in Dublin & Meath",
    "formType": "Landscaping",
    "intro": "Paving, artificial grass, decking and pergolas across Dublin, Meath, Louth, Kildare and Wicklow, designed and built by our own crew.",
    "ctaLabel": "Request a free site visit",
    "contactHeading": "Create Your Outdoor Paradise",
    "contactSub": "Tell us about your project and we'll arrange a free site visit",
    "contactNote": "Quick response for consultations and quotes"
  }
} as const;

export type ServiceSlug = keyof typeof services;
