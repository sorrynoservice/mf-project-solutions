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
          "src": "/assets/bathroom-renovations-transform-BX8sln7r.mp4"
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
          "Comprehensive warranty coverage"
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
            "a": "Yes, we provide 3D visualizations and work with you to select tiles, fixtures, and finishes that match your vision."
          },
          {
            "q": "What warranty do you provide?",
            "a": "We offer comprehensive 5-year warranties on workmanship and materials for complete peace of mind."
          },
          {
            "q": "Can you work with my existing layout?",
            "a": "Yes, we can work within your current layout or reconfigure the space for better functionality if needed."
          }
        ]
      }
    ],
    "heroImage": "/assets/bathroom-renovations-hero-new-C7-melRI.jpg",
    "heroAlt": "Bathroom Renovations",
    "title": "Bathroom Renovations",
    "intro": "Spa-inspired retreats designed around you. Transform your bathroom into a luxurious sanctuary of comfort and style with premium fixtures and modern design.",
    "ctaLabel": "Request consultation",
    "contactHeading": "Ready for Your Dream Bathroom?",
    "contactSub": "Get in touch for a free consultation and quote",
    "contactNote": "Quick response for consultations and quotes"
  },
  "garden-rooms": {
    "footerTagline": "Garden Rooms & Construction",
    "blocks": [
      {
        "type": "transform",
        "heading": "Transform Your Garden",
        "paras": [
          "A garden room adds valuable living space without the complexity of a full extension. Whether you need a home office, gym, studio, or guest room, we create bespoke spaces that blend seamlessly with your property.",
          "Every garden room is fully insulated, double-glazed, and includes complete electrical installation. We handle planning permissions, groundwork, and finishing touches so you get a turn-key solution."
        ],
        "media": {
          "type": "video",
          "src": "/assets/garden-rooms-transform-C1q3PeXW.mp4"
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
        "image": "/assets/garden-rooms-premium-DU6PxPWY.jpg",
        "alt": "Garden room interior",
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
            "src": "/assets/garden-rooms-work-2-BVO04QDu.jpg",
            "alt": "Garden room project 2"
          },
          {
            "src": "/assets/home-extensions-DgHDcJpu.png",
            "alt": "Garden room project 1"
          },
          {
            "src": "/assets/garden-rooms-work-3-D-QQPHqs.jpg",
            "alt": "Garden room project 3"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "Do I need planning permission?",
            "a": "Most garden rooms fall under exempted development. We'll assess your specific situation and handle planning if required."
          },
          {
            "q": "How long does it take?",
            "a": "Typically 6-8 weeks from initial consultation to completion, depending on size and complexity."
          },
          {
            "q": "What sizes do you build?",
            "a": "We build custom sizes to suit your needs, from compact 12m² offices to larger 40m² multi-use spaces."
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
            "q": "Do you provide warranties?",
            "a": "Yes, all our garden rooms come with comprehensive warranties on structure, materials, and workmanship."
          }
        ]
      }
    ],
    "heroImage": "/assets/garden-rooms-work-3-D-QQPHqs.jpg",
    "heroAlt": "Garden Rooms",
    "title": "Garden Rooms",
    "intro": "Create additional living space with a bespoke garden room. Perfect for home offices, studios, gyms, or relaxation spaces. Fully insulated, wired, and finished to the highest standards.",
    "ctaLabel": "Request consultation",
    "contactHeading": "Ready to Transform Your Garden?",
    "contactSub": "Get in touch for a free consultation and quote",
    "contactNote": "Quick response for consultations and quotes"
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
            "text": "Well-designed extensions can add 15-20% to your property's value"
          }
        ]
      },
      {
        "type": "transform",
        "heading": "Expand Your Living Space",
        "paras": [
          "A home extension adds valuable square footage without the stress and expense of moving. Whether you need extra bedrooms, a larger kitchen, or an open-plan living area, we create extensions that integrate seamlessly with your existing home.",
          "We handle everything from architectural design and planning permission to structural work and final finishes, ensuring a smooth process from start to finish."
        ],
        "media": {
          "type": "image",
          "src": "/assets/home-extension-03-BAXG6gxM.jpg",
          "alt": "Home extension example"
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
            "Full architectural design service",
            "Planning permission assistance",
            "Structural engineering calculations",
            "High-quality materials and finishes",
            "Project management from start to finish",
            "Building control certification",
            "Comprehensive warranty coverage",
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
            "src": "/assets/home-extensions-work-1-CkYlBiXD.jpg",
            "alt": "Extension project 1"
          },
          {
            "src": "/assets/home-extensions-work-2-Dp4o_904.jpg",
            "alt": "Extension project 2"
          },
          {
            "src": "/assets/home-extensions-work-3-Pz2e_WY6.jpg",
            "alt": "Extension project 3"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "Do I need planning permission?",
            "a": "Most extensions require planning permission. We'll assess your specific situation and handle the application process for you."
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
            "q": "What's the cost per square meter?",
            "a": "Costs vary based on specification, but typically range from €2,000-€3,500 per square meter for a quality extension."
          },
          {
            "q": "Do you handle structural engineering?",
            "a": "Yes, we work with certified structural engineers to ensure all calculations and certifications are completed properly."
          },
          {
            "q": "What warranty do you provide?",
            "a": "We offer comprehensive 10-year warranties on structure, materials, and workmanship for complete peace of mind."
          }
        ]
      }
    ],
    "heroImage": "/assets/home-extensions-living-space-ty_IPVMB.jpg",
    "heroAlt": "Home Extensions",
    "title": "Home Extensions",
    "intro": "Seamless design integration and added space. Expand your home with architectural excellence and expert craftsmanship that blends perfectly with your existing property.",
    "ctaLabel": "Request consultation",
    "contactHeading": "Ready to Expand Your Home?",
    "contactSub": "Get in touch for a free consultation and quote",
    "contactNote": "Quick response for consultations and quotes"
  },
  "interior-design": {
    "footerTagline": "Interior Design Services",
    "blocks": [
      {
        "type": "benefits",
        "heading": "Why Choose Professional Interior Design?",
        "sub": "Expert guidance that saves time, money, and creates stunning results",
        "cards": [
          {
            "icon": "palette",
            "title": "Cohesive Aesthetics",
            "text": "Create a harmonious flow throughout your home with expertly curated color palettes and materials"
          },
          {
            "icon": "eye",
            "title": "Expert Vision",
            "text": "Our designers bring years of experience and fresh perspectives to maximize your space's potential"
          },
          {
            "icon": "sofa",
            "title": "Stress-Free Process",
            "text": "We handle sourcing, coordination, and installation, saving you time and avoiding costly mistakes"
          }
        ]
      },
      {
        "type": "transform",
        "heading": "Transform Your Living Spaces",
        "paras": [
          "Professional interior design brings cohesion, style, and functionality to your home. From concept to completion, we create interiors that reflect your personality and enhance how you live.",
          "We handle everything from color consultation to furniture sourcing, ensuring every element works together to create beautiful, livable spaces."
        ],
        "media": {
          "type": "image",
          "src": "/assets/interior-design-transform-DO2yr0rp.jpg",
          "alt": "Interior design example"
        },
        "ctaLabel": "Get a quote"
      },
      {
        "type": "benefits",
        "heading": "Our Process",
        "sub": "From initial consultation to final styling, we manage every detail",
        "cards": [
          {
            "icon": "message-square",
            "title": "1. Discovery",
            "text": "We explore your lifestyle, preferences, and functional requirements for each space"
          },
          {
            "icon": "map-pin",
            "title": "2. Concept Development",
            "text": "Mood boards, color schemes, and design concepts tailored to your vision"
          },
          {
            "icon": "house",
            "title": "3. Sourcing & Planning",
            "text": "Furniture selection, material sourcing, and detailed implementation plans"
          },
          {
            "icon": "sofa",
            "title": "4. Installation",
            "text": "Professional styling and setup to bring your beautifully designed space to life"
          }
        ],
        "nested": {
          "image": "/assets/interior-design-premium-Bs_775CX.jpg",
          "alt": "Design interior",
          "heading": "Design Services",
          "items": [
            "Complete room design concepts",
            "Color consultation and paint selection",
            "Furniture and décor sourcing",
            "Lighting design and specification",
            "Window treatments and soft furnishings",
            "Art curation and styling",
            "Space planning and layout optimization",
            "Project management and installation"
          ]
        }
      },
      {
        "type": "work",
        "heading": "Our Work",
        "sub": "Stunning interiors crafted with care",
        "images": [
          {
            "src": "/assets/interior-design-work-1-CjQUtbat.jpg",
            "alt": "Design project 1"
          },
          {
            "src": "/assets/interior-design-work-2-tMCtlQBV.jpg",
            "alt": "Design project 2"
          },
          {
            "src": "/assets/interior-design-work-3-C6WtksZq.jpg",
            "alt": "Design project 3"
          }
        ]
      },
      {
        "type": "faq",
        "heading": "Common Questions",
        "items": [
          {
            "q": "How much does interior design cost?",
            "a": "Costs vary based on scope and services. We offer flexible packages from consultation-only to full-service design."
          },
          {
            "q": "Do I need to buy everything you suggest?",
            "a": "No, we work within your budget and can incorporate existing pieces you love into the new design."
          },
          {
            "q": "How long does the process take?",
            "a": "Typically 6-10 weeks from initial consultation to completion, depending on the scope of the project."
          },
          {
            "q": "Can you work with my existing furniture?",
            "a": "Absolutely! We can incorporate your existing pieces and complement them with new items for a cohesive look."
          },
          {
            "q": "Do you handle purchasing and delivery?",
            "a": "Yes, we manage all sourcing, purchasing, delivery coordination, and installation for a stress-free experience."
          },
          {
            "q": "What if I don't like the design?",
            "a": "We work collaboratively and present concepts for your approval before proceeding, ensuring you love the result."
          }
        ]
      }
    ],
    "heroImage": "/assets/interior-design-hero-new-mZbsIznb.jpg",
    "heroAlt": "Interior Design",
    "title": "Interior Design",
    "intro": "Complete styling tailored to your lifestyle. Transform your living spaces with professional interior design that reflects your personality and enhances your daily life.",
    "ctaLabel": "Request consultation",
    "contactHeading": "Transform Your Living Spaces",
    "contactSub": "Get in touch for a free consultation",
    "contactNote": "Quick response for consultations"
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
            "title": "Culinary Excellence",
            "text": "Premium appliances and optimized layout for the perfect cooking experience"
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
          "From custom cabinetry to premium appliances, we handle every aspect of your kitchen renovation with attention to detail and expert craftsmanship."
        ],
        "media": {
          "type": "image",
          "src": "/assets/kitchen-renovations-transform-BopHTFrD.jpg",
          "alt": "Kitchen renovation example"
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
            "text": "3D design, material selection, and appliance recommendations for optimal workflow"
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
            "Comprehensive warranty coverage"
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
            "q": "Do you offer financing options?",
            "a": "Yes, we can discuss flexible payment plans to suit your budget during the consultation."
          },
          {
            "q": "What warranty do you provide?",
            "a": "We offer comprehensive 5-year warranties on workmanship and materials for complete peace of mind."
          }
        ]
      }
    ],
    "heroImage": "/assets/modern-living-C4itTDh5.jpg",
    "heroAlt": "Kitchen Renovations",
    "title": "Kitchen Renovations",
    "intro": "Functional elegance meets premium appliances. Create the heart of your home with our bespoke kitchen renovation services that combine style and practicality.",
    "ctaLabel": "Request consultation",
    "contactHeading": "Ready for Your Dream Kitchen?",
    "contactSub": "Get in touch for a free consultation and quote",
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
          "src": "/assets/landscaping-pergolas-transform-K9_1rfzq.mp4"
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
            "title": "4. Maintenance Guidance",
            "text": "Comprehensive care instructions and optional ongoing maintenance services"
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
            "Comprehensive warranty coverage"
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
            "alt": "Landscaping project 1"
          },
          {
            "src": "/assets/landscaping-pergolas-work-2-BTcOGJgG.jpg",
            "alt": "Landscaping project 2"
          },
          {
            "src": "/assets/landscaping-pergolas-work-3-BrNbI35R.jpg",
            "alt": "Landscaping project 3"
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
            "q": "Do you offer maintenance services?",
            "a": "Yes, we provide optional ongoing maintenance packages to keep your outdoor space looking pristine year-round."
          },
          {
            "q": "Can you work with existing features?",
            "a": "Absolutely. We can incorporate existing trees, structures, or features into the new design or suggest improvements."
          },
          {
            "q": "What materials do you use for pergolas?",
            "a": "We use premium timber, composite materials, or aluminum depending on your preferences and budget."
          },
          {
            "q": "Do you provide design visualizations?",
            "a": "Yes, we create detailed plans and can provide 3D visualizations to help you envision the final result."
          },
          {
            "q": "What warranty do you offer?",
            "a": "We provide comprehensive 5-year warranties on workmanship and materials for all landscaping and pergola installations."
          }
        ]
      }
    ],
    "heroImage": "/assets/landscaping-pergolas-hero-new-CnIZGgZq.jpg",
    "heroAlt": "Landscaping &amp; Pergolas",
    "title": "Landscaping & Pergolas",
    "intro": "Outdoor spaces, thoughtfully crafted. Create your perfect outdoor sanctuary with professional landscaping and elegant pergolas that enhance your property.",
    "ctaLabel": "Request consultation",
    "contactHeading": "Create Your Outdoor Paradise",
    "contactSub": "Get in touch for a free consultation and quote",
    "contactNote": "Quick response for consultations and quotes"
  }
} as const;

export type ServiceSlug = keyof typeof services;
