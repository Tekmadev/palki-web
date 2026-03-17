export interface BanquetPackage {
  id: string;
  name: string;
  tagline: string;
  pricePerPerson: number;
  minGuests: number;
  maxGuests: number;
  color: string;
  features: string[];
  highlighted?: boolean;
}

export interface BanquetAmenity {
  icon: string;
  title: string;
  description: string;
}

export interface EventType {
  id: string;
  label: string;
}

export const banquetPackages: BanquetPackage[] = [
  {
    id: 'bronze',
    name: 'Ratan',
    tagline: 'Elegant Simplicity',
    pricePerPerson: 55,
    minGuests: 30,
    maxGuests: 75,
    color: '#cd7f32',
    features: [
      'Choice of 3 appetizers',
      'Buffet-style dinner (6 dishes)',
      'Naan & basmati rice station',
      'Welcome drinks',
      'Basic table décor',
      'Dedicated event coordinator',
      '4-hour venue access',
    ],
  },
  {
    id: 'silver',
    name: 'Rajat',
    tagline: 'Premium Experience',
    pricePerPerson: 85,
    minGuests: 50,
    maxGuests: 120,
    color: '#C0C0C0',
    highlighted: true,
    features: [
      'Choice of 5 appetizers',
      'Buffet-style dinner (10 dishes)',
      'Live tandoor station',
      'Cocktail hour with mocktails & bar',
      'Dessert buffet',
      'Premium floral centrepieces',
      'AV system included',
      '6-hour venue access',
      'Dedicated event team',
    ],
  },
  {
    id: 'gold',
    name: 'Swarna',
    tagline: 'The Royal Affair',
    pricePerPerson: 120,
    minGuests: 75,
    maxGuests: 150,
    color: '#F4BB44',
    features: [
      'Unlimited appetizers (butler served)',
      'Plated 5-course dinner',
      'Live cooking stations (tandoor + chaat)',
      'Full open bar service',
      'Luxury floral & candle arrangements',
      'Premium AV, lighting & LED floor',
      'Dedicated sommelier',
      'Custom wedding cake coordination',
      '8-hour venue access + rehearsal slot',
      'Valet parking arrangement',
    ],
  },
];

export const banquetAmenities: BanquetAmenity[] = [
  {
    icon: '👥',
    title: '150 Guests',
    description: 'Elegant hall accomodating up to 150 seated guests or 200 for cocktail-style receptions.',
  },
  {
    icon: '🎙️',
    title: 'AV & Sound',
    description: 'Professional sound system, wireless microphones, 4K projector, and LED display wall.',
  },
  {
    icon: '🍽️',
    title: 'Custom Menus',
    description: 'Our chefs craft bespoke menus to perfectly match your event vision and dietary requirements.',
  },
  {
    icon: '🌿',
    title: 'Décor Services',
    description: 'In-house décor team with floral arrangements, lighting, and custom centrepieces.',
  },
  {
    icon: '🍸',
    title: 'Full Bar',
    description: 'Licensed bar service with a curated selection of wines, spirits, cocktails, and mocktails.',
  },
  {
    icon: '🅿️',
    title: 'Parking',
    description: 'Complimentary parking for 80 vehicles. Premium valet service available on request.',
  },
];

export const eventTypes: EventType[] = [
  { id: 'wedding', label: 'Wedding & Reception' },
  { id: 'corporate', label: 'Corporate Event' },
  { id: 'birthday', label: 'Birthday Celebration' },
  { id: 'engagement', label: 'Engagement Party' },
  { id: 'mehndi', label: 'Mehndi / Sangeet' },
  { id: 'graduation', label: 'Graduation Party' },
  { id: 'religious', label: 'Religious Ceremony' },
  { id: 'other', label: 'Other' },
];
