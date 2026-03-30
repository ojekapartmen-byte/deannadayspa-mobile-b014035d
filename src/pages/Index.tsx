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
      
      {/* Scroll Kategori Ikon */}
      <CategoryScroll />

      <div id="services">
        {/* Heading diubah menjadi Premium sesuai permintaanmu */}
        <ServiceSection 
          title="Premium" 
          highlight="Beauty & Rejuvenation" 
          services={pamperServices} 
          isLoading={pamperLoading} 
          waNumber={waNumber} 
        />
      </div>

      <div id="premium">
        {/* Section tambahan untuk kartu premium jika diperlukan */}
        <PremiumCards />
      </div>

      {/* Section Treatment Lainnya */}
      <ServiceSection 
        title="Massage" 
        highlight="Treatments" 
        services={massageServices} 
        isLoading={massageLoading} 
        waNumber={waNumber} 
      />
      
      <ServiceSection 
        title="Nails" 
        highlight="& Beauty" 
        services={nailServices} 
        isLoading={nailsLoading} 
        waNumber={waNumber} 
      />

      {/* Bagian Kontak */}
      <ContactSection />

      {/* Spacing untuk Bottom Nav agar tidak tertutup */}
      <div className="h-16" />
      <BottomNav />
    </div>
  );
};

export default Index;
