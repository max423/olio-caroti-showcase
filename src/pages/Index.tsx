import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ChiSiamoSection } from "@/components/ChiSiamoSection";
import { OliveSection } from "@/components/OliveSection";
import { ContattiSection } from "@/components/ContattiSection";
import { ReservationForm } from "@/components/ReservationForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-olive-dark text-cream">
      <Navigation />
      <HeroSection />
      <ChiSiamoSection />
      <OliveSection />
      <ReservationForm />
      <ContattiSection />
      <Footer />
    </main>
  );
};

export default Index;
