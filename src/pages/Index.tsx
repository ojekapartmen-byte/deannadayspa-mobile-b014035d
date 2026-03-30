import HeroSection from "@/components/spa/HeroSection";
import CategoryScroll from "@/components/spa/CategoryScroll";
import PremiumCards from "@/components/spa/PremiumCards";
import ServiceSection from "@/components/spa/ServiceSection";
import ContactSection from "@/components/spa/ContactSection";
import BottomNav from "@/components/spa/BottomNav";
import { massageServices, nailServices, pamperPackages } from "@/data/spaData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <HeroSection />
      <CategoryScroll />

      <div id="services">
        <ServiceSection title="Pamper" highlight="Package" services={pamperPackages} />
      </div>

      <div id="premium">
        <PremiumCards />
      </div>

      <ServiceSection title="Massage" highlight="Treatments" services={massageServices} />
      <ServiceSection title="Nails" highlight="& Beauty" services={nailServices} />

      <ContactSection />

      {/* Bottom nav spacer */}
      <div className="h-16" />
      <BottomNav />
    </div>
  );
};

export default Index;
