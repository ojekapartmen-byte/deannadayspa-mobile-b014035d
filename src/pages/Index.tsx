import HeroSection from "@/components/spa/HeroSection";
import CategoryScroll from "@/components/spa/CategoryScroll";
import PremiumCards from "@/components/spa/PremiumCards";
import ServiceSection from "@/components/spa/ServiceSection";
import ServiceScrollSection from "@/components/spa/ServiceScrollSection";
import ContactSection from "@/components/spa/ContactSection";
import { useServices, useSiteContent } from "@/hooks/useSpaData";

const Index = () => {
  const { data: pamperServices, isLoading: pamperLoading } = useServices("pamper_package");
  const { data: massageServices, isLoading: massageLoading } = useServices("massage");
  const { data: nailServices, isLoading: nailsLoading } = useServices("nails");
  const { data: content } = useSiteContent();
  const waNumber = content?.wa_number || "6281999231518";

  return (
    <div className="min-h-screen bg-background max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto relative">
     
      <HeroSection />
      
      {/* 2. Kategori Ikon */}
      <CategoryScroll />

      {/* 3. Section Premium Cards */}
      <div id="premium">
        <PremiumCards />
      </div>

      {/* 4. Section Pamper Package (horizontal scroll) */}
      <ServiceScrollSection 
        title="Pamper" 
        highlight="Package" 
        services={pamperServices} 
        isLoading={pamperLoading} 
        waNumber={waNumber} 
      />

      {/* 5. Section Massage */}
      <ServiceSection 
        title="Massage" 
        highlight="Treatments" 
        services={massageServices} 
        isLoading={massageLoading} 
        waNumber={waNumber} 
      />
      
      {/* 6. Section Nails */}
      <ServiceSection 
        title="Nails" 
        highlight="& Beauty" 
        services={nailServices} 
        isLoading={nailsLoading} 
        waNumber={waNumber} 
      />

      {/* 7. Bagian Kontak */}
      <ContactSection />
    </div>
  );
};

export default Index;
