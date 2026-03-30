import HeroSection from "@/components/spa/HeroSection";
import CategoryScroll from "@/components/spa/CategoryScroll";
import PremiumCards from "@/components/spa/PremiumCards";
import ServiceSection from "@/components/spa/ServiceSection";
import ContactSection from "@/components/spa/ContactSection";
import BottomNav from "@/components/spa/BottomNav";
import { useServices, useSiteContent } from "@/hooks/useSpaData";

const Index = () => {
  const { data: pamperServices, isLoading: pamperLoading } = useServices("pamper_package");
  const { data: massageServices, isLoading: massageLoading } = useServices("massage");
  const { data: nailServices, isLoading: nailsLoading } = useServices("nails");
  const { data: content } = useSiteContent();
  const waNumber = content?.wa_number || "6281999231518";

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <HeroSection />
      <CategoryScroll />

      <div id="services">
        <ServiceSection title="Pamper" highlight="Package" services={pamperServices} isLoading={pamperLoading} waNumber={waNumber} />
      </div>

      <div id="premium">
        <PremiumCards />
      </div>

      <ServiceSection title="Massage" highlight="Treatments" services={massageServices} isLoading={massageLoading} waNumber={waNumber} />
      <ServiceSection title="Nails" highlight="& Beauty" services={nailServices} isLoading={nailsLoading} waNumber={waNumber} />

      <ContactSection />

      <div className="h-16" />
      <BottomNav />
    </div>
  );
};

export default Index;
