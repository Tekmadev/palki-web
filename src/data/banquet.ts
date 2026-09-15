import { business } from './business';

export type ServiceType = 'banquet' | 'catering';
export type PackageId = 'gold' | 'diamond';

export interface BanquetPackage {
  id: PackageId;
  name: string;
  pricePerPerson: number;
  itemsPerCourse: number;
  color: string;
}

export interface PackageInclusion {
  icon: 'guests' | 'buffet' | 'decorations' | 'stage' | 'parking';
  label: string;
}

export interface Option {
  id: string;
  label: string;
  detail?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

const { minGuests, maxGuests } = business.banquet;

export const formatPrice = (amount: number) => `$${amount.toFixed(2)}`;

export const banquetPackages: BanquetPackage[] = [
  { id: 'gold',    name: 'Gold',    pricePerPerson: 41.95, itemsPerCourse: 3, color: '#F4BB44' },
  { id: 'diamond', name: 'Diamond', pricePerPerson: 49.95, itemsPerCourse: 4, color: '#cfe4ee' },
];

/** Included with every banquet package. */
export const packageInclusions: PackageInclusion[] = [
  { icon: 'guests',      label: `${minGuests}–${maxGuests} guests` },
  { icon: 'buffet',      label: 'Buffet' },
  { icon: 'decorations', label: 'Decorations' },
  { icon: 'stage',       label: 'Stage & sound' },
  { icon: 'parking',     label: 'Parking' },
];

/* ── Quote form options ──────────────────────────────────────── */

export const serviceOptions: { id: ServiceType; label: string }[] = [
  { id: 'banquet',  label: 'Banquet Hall' },
  { id: 'catering', label: 'Catering' },
];

export const eventTypes: Option[] = [
  { id: 'wedding', label: 'Wedding & Reception' },
  { id: 'corporate', label: 'Corporate Event' },
  { id: 'birthday', label: 'Birthday Celebration' },
  { id: 'engagement', label: 'Engagement Party' },
  { id: 'mehndi', label: 'Mehndi / Sangeet' },
  { id: 'graduation', label: 'Graduation Party' },
  { id: 'religious', label: 'Religious Ceremony' },
  { id: 'other', label: 'Other' },
];

export const packageChoices: Option[] = [
  ...banquetPackages.map((p) => ({ id: p.id, label: p.name, detail: `${formatPrice(p.pricePerPerson)} / person` })),
  { id: 'unsure', label: 'Not sure yet' },
];

export const mealOptions: Option[] = [
  { id: 'lunch',  label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'unsure', label: 'Not sure yet' },
];

export const foodOptions: Option[] = [
  { id: 'veg',     label: 'Vegetarian' },
  { id: 'non-veg', label: 'Non-vegetarian' },
  { id: 'both',    label: 'Both' },
];

/* ── FAQ ─────────────────────────────────────────────────────────
   Shown on /banquet and repeated in its structured data, so the
   answers are built from the data above to stay in sync.         */

/** ['a', 'b', 'c'] → 'a, b, and c' */
const joinList = (items: string[]) =>
  items.length <= 2 ? items.join(' and ') : `${items.slice(0, -1).join(', ')}, and ${items.at(-1)}`;

const packageSummary = joinList(
  banquetPackages.map((p) => `${p.name} is ${formatPrice(p.pricePerPerson)} (${p.itemsPerCourse} items per course)`),
);

const inclusionSummary = joinList(
  packageInclusions.filter((i) => i.icon !== 'guests').map((i) => i.label.toLowerCase()),
);

export const banquetFaqs: Faq[] = [
  {
    question: 'How much does a banquet at Palki cost?',
    answer: `There are two packages, priced per person plus tax: ${packageSummary}.`,
  },
  {
    question: "What's included in the banquet packages?",
    answer: `Both packages include a ${inclusionSummary} for ${minGuests} to ${maxGuests} guests. The only difference is how many items you get per course.`,
  },
  {
    question: 'How many guests can the banquet hall host?',
    answer: `Our banquet packages are for events of ${minGuests} to ${maxGuests} guests.`,
  },
  {
    question: 'Does Palki offer catering?',
    answer: `Yes. Choose what you'd like from our menu and we'll prepare it for your event. Catering is priced by quote, so call us at ${business.phone.display} or send a free quote request.`,
  },
  {
    question: 'Does sending a quote request book my date?',
    answer: "No. A quote request is free and doesn't reserve anything. We'll contact you to talk through the details, and nothing is confirmed until we've agreed on them together.",
  },
  {
    question: 'Where is the banquet hall?',
    answer: `At ${business.fullName}, ${business.address.full}, in the City of Ottawa.`,
  },
  {
    question: 'What kinds of events do you host?',
    answer: 'Weddings and receptions, engagement parties, mehndi and sangeet nights, birthdays, graduations, corporate events and religious ceremonies.',
  },
];
