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
      {/* 1. Hero Section */}
      <HeroSection />
      
      {/* 2. Kategori Ikon */}
      <CategoryScroll />

      {/* 3. Section Premium Cards */}
      <div id="premium">
        <PremiumCards />
      </div>

      {/* 4. Section Premium & Beauty Rejuvenation */}
      <div id="services">
        <ServiceSection 
          title="Premium" 
          highlight="Beauty & Rejuvenation" 
          services={pamperServices} 
          isLoading={pamperLoading} 
          waNumber={waNumber} 
        />
      </div>

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

      {/* Spacing & Navigasi */}
      <div className="h-16" />
      <BottomNav />
    </div>
  );
}; // <-- Kurung penutup ini yang sebelumnya hilang

export default Index; // <-- Baris ini juga harus ada di paling bawah
