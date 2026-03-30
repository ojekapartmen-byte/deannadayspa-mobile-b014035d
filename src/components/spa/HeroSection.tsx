import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSiteContent } from "@/hooks/useSpaData";

const HeroSection = () => {
  const { data: content } = useSiteContent();

  // Gambar latar belakang (bisa diganti via dashboard atau tetap default)
  const heroImage = content?.hero_image || "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=1200&h=800";
  
  // Teks Berdasarkan Brosur Deanna Spa
  const title = "Soothe the Soul";
  const subtitle = "Relax the Body. Refresh the Mind";
  const description = "Professional spa treatments in the comfort of your villa or visit our studio in Seminyak, Bali. Discover our premium rejuvenation packages.";
  const buttonText = "Book Your Sanctuary";

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Background & Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Deanna Spa Ambiance" 
          className="w-full h-full object-cover" 
        />
        {/* Shadow Overlay - Deep Teal Gradient (Matching Brochure) */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(180deg, rgba(0, 96, 100, 0.7) 0%, rgba(0, 77, 64, 0.85) 100%)' 
          }} 
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Welcome Text in Gold */}
          <p className="text-[#D4A373] tracking-[0.4em] text-xs font-semibold uppercase mb-6 drop-shadow-sm">
            Welcome to Deanna
          </p>
          
          {/* Slogan Title */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6 text-white drop-shadow-md">
            {title}<br />
            <span className="italic font-light text-2xl sm:text-4xl lg:text-5xl opacity-90">
              {subtitle}
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-white/90 font-light text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {description}
          </p>

          {/* Action Button - Gold/Tan Color from Brochure */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-[#D4A373] text-white font-medium text-sm tracking-widest uppercase px-10 py-4 rounded-full shadow-2xl transition-all duration-300 hover:bg-[#B88A5B]"
          >
            <Sparkles className="w-4 h-4" />
            {buttonText}
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom Wave Decor - Soft Cream color */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <svg 
          viewBox="0 0 1440 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto"
        >
          <path 
            d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" 
            fill="#F8F9F5" 
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
