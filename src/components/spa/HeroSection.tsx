import React from "react";
import { useSiteContent } from "@/hooks/useSpaData";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const { data: content, isLoading } = useSiteContent();

  if (isLoading) {
    return <div className="h-[500px] w-full bg-muted animate-pulse" />;
  }

  const heroTitle = content?.hero_title || "Deanna Day Spa";
  const heroSubtitle = content?.hero_subtitle || "Soothe the Soul. Relax the Body. Refresh the Mind";
  const heroDescription = content?.hero_description || "Professional spa treatments in the comfort of your villa or visit our studio in Seminyak, Bali.";
  const heroButtonText = content?.hero_button_text || "Contact Us";
  const heroButtonVisible = content?.hero_button_visible !== "false";
  const heroImageUrl = content?.hero_image || 'https://images.unsplash.com/photo-1540555700371-41c1741f1a9a?q=80&w=2070&auto=format&fit=crop';
  const waNumber = content?.wa_number || "6281999231518";

  const handleContactUs = () => {
    const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${heroImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          {heroTitle}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium italic mt-3 max-w-2xl">
          {heroSubtitle}
        </p>
        <p className="mt-4 max-w-xl md:max-w-2xl text-sm md:text-base text-white/80 leading-relaxed">
          {heroDescription}
        </p>
        
        {heroButtonVisible && (
          <Button 
            onClick={handleContactUs}
            className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base md:text-lg px-10 md:px-14 py-6 md:py-7 rounded-full shadow-xl transition-all active:scale-95"
          >
            {heroButtonText}
          </Button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
