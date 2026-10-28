import { AboutSection } from '@/components/AboutSection';
import { AvailabilitySection } from '@/components/AvailabilitySection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { InstagramSection } from '@/components/InstagramSection';
import { PhotoMarquee } from '@/components/PhotoMarquee';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ProcessSection } from '@/components/ProcessSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function App() {
  return (
    <div className="relative min-h-screen bg-canvas">
      <Header />

      <main>
        <Hero />
        <PhotoMarquee />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <AvailabilitySection />
        <ContactSection />
        <InstagramSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
