export const CALC = {
  "VAT_RATE": 0.135,
  "EMAIL": "info@mfeng.ie",
  "WHATSAPP": "353876039378",
  "CONTINGENCY_PCT": 0.05,
  "ROLL_WIDTH": 4,
  "WASTE_RATE": 40,
  "MAX_WIDTH": 8,
  "CUSTOM_PATIO_RATE": 180,
  "CUSTOM_GRASS_RATE": 80,
  "CUSTOM_MAX_AREA": 100,
  "PATIO_OPTIONS": [
    15,
    20,
    25,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100
  ],
  "GRASS_OPTIONS": [
    15,
    20,
    30,
    40,
    50,
    60,
    70,
    80,
    90,
    100
  ],
  "packages": [
    {
      "id": "refresh",
      "name": "Garden Refresh",
      "area": 40,
      "priceExVat": 5066,
      "costEst": 3050,
      "grass": 25,
      "patio": 15,
      "badge": null,
      "desc": "25m² artificial grass · 15m² porcelain paving · Dig-out, sub-base & cleanup"
    },
    {
      "id": "makeover",
      "name": "Garden Makeover",
      "area": 60,
      "priceExVat": 7489,
      "costEst": 4400,
      "grass": 35,
      "patio": 25,
      "badge": "Most Popular",
      "desc": "35m² artificial grass · 25m² porcelain paving · Dig-out, sub-base & cleanup"
    },
    {
      "id": "complete",
      "name": "Outdoor Living",
      "area": 80,
      "priceExVat": 11410,
      "costEst": 6800,
      "grass": 50,
      "patio": 30,
      "badge": null,
      "desc": "50m² artificial grass · 30m² porcelain paving · Dig-out, sub-base & cleanup"
    }
  ],
  "beds": [
    {
      "id": "bed_t",
      "name": "Single Timber Bed",
      "detail": "2.4m × 0.6m × 0.5m — pressure-treated softwood",
      "priceExVat": 700,
      "costEst": 280
    },
    {
      "id": "bed_tl",
      "name": "L-Shaped Timber Bed",
      "detail": "Corner layout — pressure-treated softwood",
      "priceExVat": 1200,
      "costEst": 480
    },
    {
      "id": "bed_r",
      "name": "Single Rendered Block Bed",
      "detail": "2.4m × 0.6m × 0.5m — rendered & painted finish",
      "priceExVat": 1050,
      "costEst": 450
    },
    {
      "id": "bed_rl",
      "name": "L-Shaped Rendered Block Bed",
      "detail": "Corner layout — rendered & painted finish",
      "priceExVat": 1750,
      "costEst": 750
    }
  ],
  "drainage": [
    {
      "id": "dr_aco3",
      "name": "ACO Channel Drain — 3 lin.m",
      "detail": "Galvanised grate, connected to existing drainage",
      "priceExVat": 450,
      "costEst": 200,
      "escalation": false
    },
    {
      "id": "dr_aco5",
      "name": "ACO Channel Drain — 5 lin.m",
      "detail": "Galvanised grate, connected to existing drainage",
      "priceExVat": 700,
      "costEst": 320,
      "escalation": false
    },
    {
      "id": "dr_aco_c",
      "name": "ACO Channel Drain — Custom Run",
      "detail": "Over 5m or complex routing — priced per lin.m",
      "priceExVat": 140,
      "costEst": 65,
      "escalation": true
    },
    {
      "id": "dr_soil",
      "name": "Soil / Land Drain",
      "detail": "Perforated pipe in gravel trench — up to 10 lin.m",
      "priceExVat": 600,
      "costEst": 250,
      "escalation": false
    },
    {
      "id": "dr_soil_c",
      "name": "Soil / Land Drain — Extended",
      "detail": "Over 10m or multiple runs — site survey required",
      "priceExVat": 60,
      "costEst": 28,
      "escalation": true
    },
    {
      "id": "dr_soak",
      "name": "Soakaway Pit",
      "detail": "Soakaway crate system with membrane and backfill",
      "priceExVat": 850,
      "costEst": 380,
      "escalation": false
    },
    {
      "id": "dr_down",
      "name": "Downpipe / Gutter Connection",
      "detail": "Connect structure guttering to existing drain",
      "priceExVat": 300,
      "costEst": 120,
      "escalation": false
    }
  ],
  "structures": [
    {
      "id": "pg_3",
      "cat": "Timber Pergolas",
      "name": "Timber Pergola — 3m × 2.5m",
      "detail": "Polycarbonate roof, integrated guttering",
      "priceExVat": 3500,
      "costEst": 1400,
      "escalation": false,
      "contingency": false
    },
    {
      "id": "pg_4",
      "cat": "Timber Pergolas",
      "name": "Timber Pergola — 4m × 3m",
      "detail": "Polycarbonate roof, integrated guttering",
      "priceExVat": 4500,
      "costEst": 1800,
      "escalation": false,
      "contingency": false
    },
    {
      "id": "pg_5",
      "cat": "Timber Pergolas",
      "name": "Timber Pergola — 5m × 3m",
      "detail": "Polycarbonate roof, integrated guttering",
      "priceExVat": 5500,
      "costEst": 2300,
      "escalation": false,
      "contingency": false
    },
    {
      "id": "pg_6",
      "cat": "Timber Pergolas",
      "name": "Timber Pergola — 6m × 3m",
      "detail": "Polycarbonate roof, integrated guttering",
      "priceExVat": 6800,
      "costEst": 2900,
      "escalation": false,
      "contingency": false
    },
    {
      "id": "al_s",
      "cat": "Aluminium Veranda Systems",
      "name": "Aluminium Veranda — Small",
      "detail": "3m × 2.5m, polycarbonate roof, powder-coated",
      "priceExVat": 5200,
      "costEst": 3300,
      "escalation": true,
      "contingency": false
    },
    {
      "id": "al_m",
      "cat": "Aluminium Veranda Systems",
      "name": "Aluminium Veranda — Medium",
      "detail": "4m × 3m, polycarbonate roof, powder-coated",
      "priceExVat": 6800,
      "costEst": 4400,
      "escalation": true,
      "contingency": false
    },
    {
      "id": "al_l",
      "cat": "Aluminium Veranda Systems",
      "name": "Aluminium Veranda — Large",
      "detail": "5m × 3m, polycarbonate roof, powder-coated",
      "priceExVat": 8500,
      "costEst": 5700,
      "escalation": true,
      "contingency": false
    },
    {
      "id": "al_g",
      "cat": "Aluminium Veranda Systems",
      "name": "Glass Roof Upgrade — 4m × 3m",
      "detail": "Toughened glass roof, aluminium frame",
      "priceExVat": 9000,
      "costEst": 6100,
      "escalation": true,
      "contingency": false
    },
    {
      "id": "gl_f",
      "cat": "Sliding Glass Enclosures",
      "name": "Glass Enclosure — Front Only",
      "detail": "3–4 linear metres @ €999/lm",
      "priceExVat": 2640,
      "costEst": 1650,
      "escalation": true,
      "contingency": false
    },
    {
      "id": "gl_fs",
      "cat": "Sliding Glass Enclosures",
      "name": "Glass Enclosure — Front + Side",
      "detail": "5–7 linear metres @ €999/lm",
      "priceExVat": 4400,
      "costEst": 2750,
      "escalation": true,
      "contingency": false
    },
    {
      "id": "gl_3",
      "cat": "Sliding Glass Enclosures",
      "name": "Glass Enclosure — Three-Sided",
      "detail": "8–12 linear metres @ €999/lm",
      "priceExVat": 7040,
      "costEst": 4400,
      "escalation": true,
      "contingency": false
    },
    {
      "id": "rm_s",
      "cat": "Garden Rooms",
      "name": "Garden Room — Small (3m × 3m)",
      "detail": "Enclosed, cladding, glass doors, EPDM roof",
      "priceExVat": 10000,
      "costEst": 6500,
      "escalation": true,
      "contingency": true
    },
    {
      "id": "rm_m",
      "cat": "Garden Rooms",
      "name": "Garden Room — Medium (5m × 3m)",
      "detail": "Enclosed, cladding, glass doors, EPDM roof",
      "priceExVat": 15500,
      "costEst": 10000,
      "escalation": true,
      "contingency": true
    },
    {
      "id": "rm_l",
      "cat": "Garden Rooms",
      "name": "Garden Room — Large (6m × 4m)",
      "detail": "Enclosed, cladding, glass doors, EPDM roof",
      "priceExVat": 21000,
      "costEst": 13500,
      "escalation": true,
      "contingency": true
    }
  ]
} as const;
