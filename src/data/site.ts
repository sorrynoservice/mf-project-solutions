/**
 * Single source of truth for company facts and contact details.
 * Change a number or email here and it updates everywhere on the site.
 */

export const SITE_URL = "https://mfprojectsolutions.ie";

/**
 * Web3Forms access key for the enquiry form (created at web3forms.com with info@mfeng.ie).
 * It is designed to be public. Set it back to "REPLACE_WITH_KEY" to make the form fall back to email.
 */
export const WEB3FORMS_KEY = "175196db-96cf-41a0-aa5c-27e2cf24caa9";

export const company = {
  name: "MF Project Solutions",
  legalName: "MF Engineering and Designs Limited",
  companyReg: "695263",
  vat: "IE3774742UH",
  established: 2021,
  address: "Unit 1, Merrywell Business Park, Drumree, Co. Meath, A85 EC84",
  reviewUrl: "https://g.page/r/CQe6nq8vC3oqEAE/review",
  facebook: "https://www.facebook.com/profile.php?id=61566828341610",
  instagram: "https://www.instagram.com/mfprojectsolutions/",
};

export const contacts = {
  construction: {
    label: "Construction enquiries",
    display: "+353 83 809 7035",
    tel: "tel:+353838097035",
    whatsapp: "https://wa.me/353838097035",
    email: "info@mfeng.ie",
  },
  snagging: {
    label: "Snagging enquiries (Wanessa)",
    display: "+353 83 801 4857",
    tel: "tel:+353838014857",
    whatsapp: "https://wa.me/353838014857",
    email: "wcorrea@mfeng.ie",
  },
  alex: {
    label: "Alex, Managing Director",
    display: "+353 87 603 9378",
    tel: "tel:+353876039378",
    email: "aferreira@mfeng.ie",
  },
};

export const areas = [
  { county: "Dublin", towns: "all districts" },
  { county: "Meath", towns: "Navan, Ashbourne, Ratoath, Dunboyne, Dunshaughlin, Trim" },
  { county: "Louth", towns: "Drogheda" },
  { county: "Kildare", towns: "Kilcock, Maynooth, Celbridge" },
  { county: "Wicklow", towns: "Bray, Greystones, Blessington, Wicklow town" },
];
