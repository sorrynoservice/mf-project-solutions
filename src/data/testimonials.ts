export type Testimonial = {
  name: string;
  /** ISO date; the displayed "x months ago" label is derived from this at render time. */
  date: string;
  /** Optional photo. Without one, the card shows the reviewer's initials. */
  avatar?: string;
  /** "build" = construction work, "snagging" = snag inspections. Controls where a review is shown. */
  category: "build" | "snagging";
  /** Service pages that should show this review (ServicePage slugs). */
  services?: string[];
  text: string;
};

/**
 * Copied word for word from Google. Never edit the wording and never add reviews
 * from anyone who works for MF Project Solutions.
 * Building reviews come first so the homepage leads with construction work.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Harry English",
    date: "2026-06-20",
    category: "build",
    services: ["garden-rooms", "landscaping-pergolas"],
    text: "Absolutely delighted with the work from MF Project Solutions! We found it really tough to get a single crew who could handle the full paving, the astro fitting, and deliver a turnkey garden room with such a clean finish, but these guys delivered exactly that. The service from start to finish was top class, and their level of consultation gave us total peace of mind the whole way through the project. We went with a split layout\u2014a storage room and a main space that does the job perfectly as a hybrid home office, gym, and second living room. Couldn't recommend them highly enough to anyone looking to sort out their garden space.",
  },
  {
    name: "Simon Chuberre",
    date: "2026-06-20",
    category: "build",
    services: ["garden-rooms", "landscaping-pergolas"],
    text: "Highly recommended\n\nWe are super happy with the shed built by MF Projects Solution. The entire process was completely painless from start to finish.\n\nA special shoutout to Rosana, who we dealt with for the quote and billing, she was incredibly helpful and always super responsive to our messages. When it came to the build, Edson and his colleague were fantastic. They were incredibly nice, efficient, and managed to complete the entire job in just 3 days!\n\nWe also loved that they had no problem accommodating our request to repurpose our own doors and windows. From the initial site visit to the final completion, everything was seamless. We are absolutely delighted with the result and will defo hire them again for future projects",
  },
  {
    name: "Paula Medici",
    date: "2026-04-20",
    category: "build",
    services: ["bathroom-renovations"],
    text: "We recently had our bathroom renovated by MF and we\u2019re very happy with the result. The team were professional, reliable, and easy to communicate with throughout the process.\n\nThe bathroom turned out exactly as we had imagined. We\u2019re already planning our next project with them and would highly recommend MF.",
  },
  {
    name: "Joao Paulo de Oliveira",
    date: "2025-11-15",
    avatar: "/reviews/avatar-1.png",
    category: "snagging",
    text: "We had our new home inspected by Jardan from MF, and the service was excellent from start to finish. He was extremely thorough, professional, and knowledgeable, spotting all details. Jardan explained everything clearly and was very friendly and easy to deal with.\n\nA special mention to Wanessa, who was always available on WhatsApp and very flexible whenever we needed to adjust anything.\n\nThe final report was detailed, well-organized, and delivered quickly. We highly recommend MF project solutions for anyone needing a reliable snagging inspection!",
  },
  {
    name: "Marcus Vinicius de Souza e Silva",
    date: "2025-11-15",
    avatar: "/reviews/avatar-2.png",
    category: "snagging",
    text: "Our snag report was perfect. They checked everything. Really complete and easy to understand.",
  },
  {
    name: "Pedro Henrique Meyer",
    date: "2025-11-15",
    avatar: "/reviews/avatar-3.png",
    category: "snagging",
    text: "I had my snag done with them and I’m very happy with the service. I dealt with Wanessa, who was very attentive and patient. She answered all the questions we had and gave great feedback, especially since I couldn’t be there during the inspection. I definitely recommend them.",
  },
  {
    name: "Ivan Bruzadelli",
    date: "2025-11-15",
    avatar: "/reviews/avatar-4.png",
    category: "snagging",
    text: "Amazing excellent job , arrived on time staff very friendly very professional , recommend",
  },
  {
    name: "Ana Luiza Pinto Queiroz",
    date: "2025-11-15",
    avatar: "/reviews/avatar-5.png",
    category: "snagging",
    text: "Detailed snagging, quick turnaround of the report, friendly engineer and costumer service. Super recommend them!",
  },
  {
    name: "Ingrid Gonçalves Machuca Dias",
    date: "2025-11-15",
    avatar: "/reviews/avatar-6.png",
    category: "snagging",
    text: "We recently had MF carry out a snag inspection on our new build house, and we couldn’t be happier with the service. The team was quick, efficient, and very thorough in identifying and documenting all the issues. Their attention to detail gave us real confidence that nothing was missed. Excellent communication throughout and a very smooth process from start to finish. Highly recommend!",
  },
  {
    name: "Eduardo Santarosa",
    date: "2025-11-15",
    avatar: "/reviews/avatar-7.png",
    category: "snagging",
    text: "Outstanding service!\nExtremely polite and helpful team. They carried out the snag for my new house the very next day after I contacted them — a clear sign of their commitment to the client. They even shared all the important information about the house, which was above and beyond the agreed service. Truly professional, courteous and reliable. Highly recommend — 10/10.",
  },
  {
    name: "Cathal Brennan",
    date: "2025-10-15",
    avatar: "/reviews/avatar-8.png",
    category: "build",
    services: ["interior-design", "home-extensions", "kitchen-renovations"],
    text: "Delighted to give a 5 star review to Alex and his team after employing them for an extensive 3 month renovation. The entire team were incredibly tidy and neat around the property, they were always solution orientated and they brought excellent craftsmenship throughout each aspect of the renovation. Would recommend them 100%.",
  },
  {
    name: "Bruna Almada",
    date: "2025-10-15",
    avatar: "/reviews/avatar-9.png",
    category: "snagging",
    text: "MF Project Solutions made the Snag list of my house, they are the best. I booked 5 days in advanced and the report was ready in 48h. Everything was checked and well detailed in the report. I highly recommend them!",
  },
  {
    name: "fabio tatematsu",
    date: "2025-10-15",
    avatar: "/reviews/avatar-10.png",
    category: "snagging",
    text: "I recommend this company, very punctual and professional in service",
  },
  {
    name: "Angélica Kvieczynski",
    date: "2025-10-15",
    avatar: "/reviews/avatar-11.png",
    category: "snagging",
    text: "My husband and I recently hired MF Project Solutions to create a snaglist for our new house, and we were very impressed with their excellent service and attention to detail. I highly recommend the company.",
  },
  {
    name: "Maria Clara Lago",
    date: "2025-10-15",
    avatar: "/reviews/avatar-12.png",
    category: "snagging",
    text: "Great experience! Excellent service, all my questions were answered. Super attentive and quick to respond. The inspection report is very well explained (perfect for someone who doesn't understand anything, like me). I highly recommend them.",
  },
  {
    name: "Caynan Cibiem",
    date: "2025-10-15",
    avatar: "/reviews/avatar-13.png",
    category: "snagging",
    text: "MF Projects has been fantastic from the beginning. Booked my snagging within a week, reporting was delivered next day of the inspection, full of details and photos. Definitely will do the re-snagging with them!",
  },
  {
    name: "Adriana",
    date: "2025-09-15",
    avatar: "/reviews/avatar-14.png",
    category: "snagging",
    text: "My experience with MF Project Solutions was truly wonderful. I hired them for both the house snag service and the complete property measurement, and both were done with great care, attention, and professionalism.\nI was assisted by Wanessa and Alex, who made the whole process much lighter and smoother. They were both always patient, transparent, polite, and very attentive, explaining every detail and showing a dedication that gave me a lot of confidence. In addition, the delivery of the report was super fast and of impeccable quality. I was very satisfied with the result and wholeheartedly recommend their work to anyone looking for a serious, well-done service with a welcoming approach.",
  },
  {
    name: "Caroline Duarte",
    date: "2025-09-15",
    avatar: "/reviews/avatar-15.png",
    category: "snagging",
    text: "From the start the service was excellent – Wanessa was very responsive, managed to schedule the inspection exactly on the day I asked for, which made everything much faster and easier. Jardel did the snagging and was extremely detailed and professional, and the report we received was very clear and thorough. We really appreciated the availability and support throughout, and would definitely recommend them.",
  },
];
