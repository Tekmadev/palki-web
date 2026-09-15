import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import BanquetPageContent from '@/components/BanquetPageContent';
import JsonLd from '@/components/JsonLd';
import { business } from '@/data/business';
import { banquetPackages, formatPrice } from '@/data/banquet';
import { banquetPageJsonLd } from '@/lib/structured-data';

const { minGuests, maxGuests } = business.banquet;
const title = 'Banquet Hall & Catering in Ottawa';
const description =
  `Ottawa banquet hall for ${minGuests}–${maxGuests} guests. ` +
  banquetPackages.map((p) => `${p.name} ${formatPrice(p.pricePerPerson)}`).join(' or ') +
  ' per person + tax, with buffet, decorations, stage & sound and parking. Catering too.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/banquet' },
  openGraph: {
    title: `${title} | ${business.fullName}`,
    description,
    url: '/banquet',
    siteName: business.fullName,
    type: 'website',
    locale: 'en_CA',
  },
};

export default function BanquetPage() {
  return (
    <SmoothScrollProvider>
      <JsonLd data={banquetPageJsonLd()} />
      <Navbar />
      <main>
        <BanquetPageContent />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
