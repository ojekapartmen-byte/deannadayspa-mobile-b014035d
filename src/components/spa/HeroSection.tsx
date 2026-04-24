import React from "react";
import { useSiteContent } from "@/hooks/useSpaData";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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
  const brochureUrl = content?.brochure_url || "";
  const brochureButtonText = content?.brochure_button_text || "Download Brochure";
  const brochureButtonVisible = content?.brochure_button_visible !== "false" && !!brochureUrl;

  const handleContactUs = () => {
    const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}`;
    window.open(waUrl, "_blank");
  };

  const handleDownloadBrochure = async () => {
    if (!brochureUrl) return;
    try {
      const res = await fetch(brochureUrl, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deanna-day-spa-brochure.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      // Fallback: open in new tab
      window.open(brochureUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="relative w-full h-[600px] md:h-[80vh] lg:h-screen min-h-[500px] overflow-hidden">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500"
        style={{ 
          backgroundImage: `url('${heroImageUrl}')`,
          width: '100%',
          height: '100%'
        }}
      >
        {/* Overlay agar teks terbaca */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center text-white px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-2xl lg:text-3xl text-white/95 font-medium italic mt-4 drop-shadow-md">
            {heroSubtitle}
          </p>
          <p className="mt-6 max-w-xl md:max-w-2xl mx-auto text-sm md:text-lg text-white/90 leading-relaxed drop-shadow-sm">
            {heroDescription}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {heroButtonVisible && (
              <Button
                onClick={handleContactUs}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base md:text-xl px-10 md:px-16 py-7 md:py-8 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                {heroButtonText}
              </Button>
            )}
            {brochureButtonVisible && (
              <Button
                onClick={handleDownloadBrochure}
                variant="outline"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/60 hover:text-white font-semibold text-base md:text-xl px-10 md:px-16 py-7 md:py-8 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <Download className="mr-2 !w-5 !h-5" />
                {brochureButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
