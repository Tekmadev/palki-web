/* ============================================================
   Structured data (schema.org JSON-LD) for search engines and
   AI assistants. Built from src/data so it never drifts from
   what the page shows.
   ============================================================ */

import { business } from '@/data/business';
import { banquetFaqs, banquetPackages, packageInclusions } from '@/data/banquet';
import { siteUrl } from '@/lib/site';

const restaurantId = `${siteUrl}/#restaurant`;
const banquetUrl = `${siteUrl}/banquet`;
const { minGuests, maxGuests } = business.banquet;

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: business.address.street,
  addressLocality: business.address.city,
  addressRegion: business.address.province,
  postalCode: business.address.postal,
  addressCountry: 'CA',
};

const telephone = business.phone.tel.replace('tel:', '');
const ottawa = { '@type': 'City', name: 'Ottawa' };

/** '4:00 PM' → '16:00' */
function to24Hour(time: string) {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  const hours = (Number(match[1]) % 12) + (match[3].toUpperCase() === 'PM' ? 12 : 0);
  return `${String(hours).padStart(2, '0')}:${match[2]}`;
}

/** Turns business.hours ('4:00 PM – 8:00 PM') into schema.org opening hours, skipping closed days. */
function openingHours() {
  return business.hours.flatMap(({ day, time }) => {
    const [opens, closes] = time.split('–').map(to24Hour);
    return opens && closes
      ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: day, opens, closes }]
      : [];
  });
}

export function restaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': restaurantId,
    name: business.fullName,
    url: siteUrl,
    telephone,
    servesCuisine: 'Indian',
    foundingDate: String(business.established),
    hasMenu: `${siteUrl}/menu`,
    address: postalAddress,
    hasMap: business.address.mapsUrl,
    openingHoursSpecification: openingHours(),
  };
}

export function banquetPageJsonLd() {
  const inclusions = packageInclusions.map((i) => i.label).join(', ');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${banquetUrl}#webpage`,
        url: banquetUrl,
        name: 'Banquet Hall & Catering in Ottawa',
        isPartOf: { '@type': 'WebSite', url: siteUrl, name: business.fullName },
        about: { '@id': restaurantId },
        breadcrumb: { '@id': `${banquetUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${banquetUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Banquets & Catering', item: banquetUrl },
        ],
      },
      {
        '@type': 'EventVenue',
        '@id': `${banquetUrl}#venue`,
        name: `${business.name} Banquet Hall`,
        url: banquetUrl,
        telephone,
        address: postalAddress,
        maximumAttendeeCapacity: maxGuests,
        containedInPlace: { '@id': restaurantId },
        amenityFeature: packageInclusions
          .filter((i) => i.icon === 'decorations' || i.icon === 'stage' || i.icon === 'parking')
          .map((i) => ({ '@type': 'LocationFeatureSpecification', name: i.label, value: true })),
      },
      {
        '@type': 'Service',
        '@id': `${banquetUrl}#packages`,
        name: 'Banquet hall packages',
        serviceType: 'Banquet hall with buffet',
        url: `${banquetUrl}#packages`,
        provider: { '@id': restaurantId },
        areaServed: ottawa,
        offers: banquetPackages.map((p) => ({
          '@type': 'Offer',
          name: `${p.name} package`,
          description: `${p.itemsPerCourse} items per course. Includes ${inclusions}.`,
          price: p.pricePerPerson.toFixed(2),
          priceCurrency: 'CAD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: p.pricePerPerson.toFixed(2),
            priceCurrency: 'CAD',
            referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText: 'person' },
            valueAddedTaxIncluded: false,
          },
          eligibleQuantity: { '@type': 'QuantitativeValue', minValue: minGuests, maxValue: maxGuests, unitText: 'guests' },
        })),
      },
      {
        '@type': 'Service',
        '@id': `${banquetUrl}#catering`,
        name: 'Indian catering',
        serviceType: 'Catering',
        description: `Dishes from the ${business.name} menu prepared for your event. Priced by quote.`,
        url: `${banquetUrl}#catering`,
        provider: { '@id': restaurantId },
        areaServed: ottawa,
      },
      {
        '@type': 'FAQPage',
        '@id': `${banquetUrl}#faq`,
        mainEntity: banquetFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}
