import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSiteContent } from "@/hooks/useSpaData";

const HeroSection = () => {
  const { data: content } = useSiteContent();

  const heroImage = content?.hero_image || "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=800&h=1200";
  const title = content?.hero_title || "Deanna Day Spa";
  const subtitle = content?.hero_subtitle || "Treatments & Beauty";
  const description = content?.hero_description || "Indulge in a world of relaxation and beauty.";

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Spa ambiance" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(174 50% 30% / 0.75), hsl(174 50% 25% / 0.85))' }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-spa-gold-light tracking-[0.3em] text-xs font-body uppercase mb-4">
            Welcome to Deanna
          </p>
          <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-4 text-primary-foreground">
            {title}<br />
            <span className="italic">{subtitle}</span>
          </h1>
          <p className="text-primary-foreground/80 font-body text-sm leading-relaxed mb-8 max-w-xs mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-body font-medium text-sm tracking-wider uppercase px-8 py-3.5 rounded-full shadow-elevated transition-transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          Contact Us
        </motion.a>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="hsl(180 20% 98%)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
