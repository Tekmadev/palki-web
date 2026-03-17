import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import BanquetSection from '@/components/BanquetSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>
        <HeroSection />
        <MenuSection />
        <BanquetSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}