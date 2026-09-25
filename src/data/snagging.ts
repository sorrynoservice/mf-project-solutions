import {
  BadgeEuro,
  ClipboardList,
  House,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const snaggingIcons: Record<string, LucideIcon> = {
  "badge-euro": BadgeEuro,
  "clipboard-list": ClipboardList,
  "house": House,
  "sparkles": Sparkles,
};

export const snagging = {
  "tiers": [
    {
      "name": "2 bedrooms",
      "icon": "badge-euro",
      "price": "€280",
      "items": [
        "Full snag list with photos",
        "Delivery within 24 to 48 hours",
        "Phone review of key items"
      ]
    },
    {
      "name": "3 bedrooms",
      "icon": "badge-euro",
      "price": "€300",
      "items": [
        "Full snag list with photos",
        "Delivery within 24 to 48 hours",
        "Phone review of key items"
      ]
    },
    {
      "name": "4 bedrooms",
      "icon": "badge-euro",
      "price": "€350",
      "items": [
        "Full snag list with photos",
        "Delivery within 24 to 48 hours",
        "Phone review of key items"
      ]
    },
    {
      "name": "5 bedrooms",
      "icon": "badge-euro",
      "price": "€400",
      "items": [
        "Full snag list with photos",
        "Delivery within 24 to 48 hours",
        "Phone review of key items"
      ]
    }
  ],
  "steps": [
    {
      "icon": "clipboard-list",
      "title": "1. Book",
      "text": "Fill the quick form, we confirm a slot and coordinate access details with you"
    },
    {
      "icon": "house",
      "title": "2. Inspect",
      "text": "Thorough walk through with photos, clear notes, fire safety and ventilation checks"
    },
    {
      "icon": "sparkles",
      "title": "3. Deliver",
      "text": "PDF snag list within 24 to 48 hours with actionable items the builder understands"
    }
  ],
  "doc": {
    "image": "/assets/snag-report-sample-3Qb2iZE3.jpg",
    "alt": "Sample snag report",
    "heading": "Professional Documentation",
    "intro": "Our snag lists are comprehensive yet easy to understand. Each item includes:",
    "items": [
      "High-quality photos showing the issue",
      "Clear description in plain language",
      "Reference to Irish Building Regulations where applicable",
      "Recommended action for the builder"
    ]
  },
  "inspections": {
    "heading": "Professional inspections",
    "sub": "Serving new builds and apartments across Dublin",
    "images": [
      {
        "src": "/assets/inspection-commercial-DbEIfzbX.jpg",
        "alt": "Commercial space inspection"
      },
      {
        "src": "/assets/inspection-mechanical-DykuSlFk.jpg",
        "alt": "Mechanical systems inspection"
      },
      {
        "src": "/assets/inspection-construction-wyPzuRnm.jpg",
        "alt": "Construction site inspection"
      }
    ]
  },
  "faq": [
    {
      "q": "Is painting included?",
      "a": "No, we focus on the inspection and the snag report. We keep scope tight so the report is lean and effective."
    },
    {
      "q": "How fast is the report?",
      "a": "Usually within 24 to 48 hours after the visit. We keep you posted if anything unusual comes up."
    },
    {
      "q": "Do you do a second visit?",
      "a": "Yes, the re‑snag visit is €200 and focuses only on the items the builder says are complete."
    },
    {
      "q": "What about VAT?",
      "a": "Listed prices already include VAT and travel within 50 km of Dublin. No surprises at checkout."
    },
    {
      "q": "Can I get a report in Portuguese?",
      "a": "Yes, reports can be delivered in English or Portuguese (PT-BR) based on your preference."
    },
    {
      "q": "What areas do you cover?",
      "a": "We cover Dublin and surrounding areas within 50 km. Contact us if you're outside this range."
    }
  ],
  "hero": {
    "image": "/assets/hero-interior-DnW16H7G.jpg",
    "alt": "Professional Snagging Services",
    "title": "Professional Snagging Services",
    "intro": "Expert civil engineering and quality management. We inspect new homes and deliver comprehensive, photo-backed snag lists aligned to Irish Building Regulations."
  },
  "expert": {
    "video": "/assets/expert-quality-B9JbhCSM.mp4",
    "heading": "Expert Quality Management",
    "p1": "Led by Alex Ferreira, civil engineer and quality manager with over 20 years of experience. We deliver comprehensive inspections that give you peace of mind and clear actionable items for your builder.",
    "p2": "Every snag list is aligned to Irish Building Regulations, documented with high-quality photos, and delivered within 24-48 hours. We keep it practical so you get results, not a novel."
  },
  "pricingHeading": "Straightforward pricing",
  "pricingSub": "Prices include VAT and travel up to 50 km from Dublin",
  "pricingNote": "*Travel over 50 km will incur an additional €50 fee",
  "processHeading": "How we work",
  "processSub": "A simple, professional process designed to give you comprehensive results with minimal hassle",
  "faqHeading": "Common questions",
  "contactHeading": "Book or ask a question",
  "contactSub": "We're here to help you with your snagging inspection",
  "addons": [
    {
      "name": "Re‑snag visit",
      "price": "€200",
      "text": "Second visit to verify the builder's corrections, focused and efficient"
    },
    {
      "name": "Room measurements add‑on",
      "price": "€200",
      "text": "Full room measurements with a simple floor plan delivered as a PDF"
    }
  ]
} as const;
