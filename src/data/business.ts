/* ============================================================
   PALKI — BUSINESS INFORMATION
   Update this file whenever any business details change.
   All components should import from here instead of hardcoding.
   ============================================================ */

export const business = {
  // ── Identity ───────────────────────────────────────────────
  name:        'Palki',
  tagline:     'Cuisine of India',
  fullName:    'Palki: Cuisine of India',
  legalName:   'Palki Restaurant Inc.',        // ← update if different
  established:  2004,

  // ── Contact ────────────────────────────────────────────────
  phone: {
    display: '(613) 822-7772',
    tel:     '+16138227772',                   // used in href="tel:..."
  },
  email: 'info@palkirestaurant.ca',            // ← update with real email

  // ── Location ───────────────────────────────────────────────
  address: {
    street:   '6501 Russell Rd.',
    city:     'Carlsbad Springs',
    province: 'ON',
    postal:   'K0A 1K0',
    country:  'Canada',
    /** Full single-line version for display */
    full:     '6501 Russell Rd., Carlsbad Springs, ON K0A 1K0',
    /** Google Maps search query */
    mapsQuery: 'Palki+Restaurant+6501+Russell+Rd+Carlsbad+Springs+ON',
    mapsUrl:   'https://maps.google.com/?q=Palki+Restaurant+6501+Russell+Rd+Carlsbad+Springs+ON',
  },

  // ── Hours ──────────────────────────────────────────────────
  hours: [
    { day: 'Monday',    time: '4:00 PM – 8:00 PM' },
    { day: 'Tuesday',   time: 'Closed'             },
    { day: 'Wednesday', time: '4:00 PM – 8:00 PM' },
    { day: 'Thursday',  time: '12:00 PM – 8:00 PM' },
    { day: 'Friday',    time: '12:00 PM – 8:00 PM' },
    { day: 'Saturday',  time: '12:00 PM – 8:00 PM' },
    { day: 'Sunday',    time: '12:00 PM – 8:00 PM' },
  ],

  // ── Banquet ────────────────────────────────────────────────
  banquet: {
    capacity: 150,
    phone: {
      display: '(613) 822-7772',
      tel:     '+16138227772',
    },
  },

  // ── Social ─────────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/palkirestaurant', // ← update
    facebook:  'https://facebook.com/palkirestaurant',  // ← update
  },

  // ── SEO / Meta ─────────────────────────────────────────────
  seo: {
    title:       'Palki: Cuisine of India | Authentic Indian Restaurant Ottawa',
    description: 'Experience the finest authentic Indian cuisine in Ottawa. Palki Restaurant offers an exquisite dining experience, premium banquet hall for 150 guests. Reserve your table today.',
    keywords: [
      'Indian restaurant Ottawa',
      'Palki restaurant',
      'banquet hall Ottawa',
      'Indian food Ottawa',
      'fine dining Ottawa',
      'curry Ottawa',
      'wedding reception Ottawa',
      'Carlsbad Springs restaurant',
    ],
  },
} as const;
