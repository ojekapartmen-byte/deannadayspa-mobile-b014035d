import HeroSection from "@/components/spa/HeroSection";
import CategoryScroll from "@/components/spa/CategoryScroll";
import PremiumCards from "@/components/spa/PremiumCards";
import ServiceSection from "@/components/spa/ServiceSection";
import ServiceScrollSection from "@/components/spa/ServiceScrollSection";
import ContactSection from "@/components/spa/ContactSection";
import DesktopNav from "@/components/spa/DesktopNav";
import { useServices, useSiteContent } from "@/hooks/useSpaData";

const Index = () => {
  const { data: pamperServices, isLoading: pamperLoading } = useServices("pamper_package");
  const { data: massageServices, isLoading: massageLoading } = useServices("massage");
  const { data: nailServices, isLoading: nailsLoading } = useServices("nails");
  const { data: content } = useSiteContent();
  const waNumber = content?.wa_number || "6281999231518";

  return (
    <div className="min-h-screen bg-background relative w-full">
      {/* DesktopNav tetap ada (jika isinya null, tidak akan muncul apa-apa) */}
      <DesktopNav />
      
      {/* 1. Hero Section: Dibuat benar-benar full width */}
      <div className="w-full">
        <HeroSection />
      </div>
      
      {/* 2. Container untuk konten lainnya agar tetap rapi di tengah */}
      <div className="max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4">
        
        {/* Kategori Ikon */}
        <CategoryScroll />

        {/* Section Premium Cards */}
        <div id="premium">
          <PremiumCards />
        </div>

        {/* Section Pamper Package */}
        <ServiceScrollSection 
          title="Pamper" 
          highlight="Package" 
          services={pamperServices} 
          isLoading={pamperLoading} 
          waNumber={waNumber} 
        />

        {/* Section Massage */}
        <ServiceSection 
          title="Massage" 
          highlight="Treatments" 
          services={massageServices} 
          isLoading={massageLoading} 
          waNumber={waNumber} 
        />
        
        {/* Section Nails */}
        <ServiceSection 
          title="Nails" 
          highlight="& Beauty" 
          services={nailServices} 
          isLoading={nailsLoading} 
          waNumber={waNumber} 
        />

        {/* Bagian Kontak */}
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
