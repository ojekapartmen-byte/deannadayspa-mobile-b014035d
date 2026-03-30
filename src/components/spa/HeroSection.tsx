import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-[400px] w-full overflow-hidden">
      {/* Background Image / Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1540555700371-41c1741f1a9a?q=80&w=2070&auto=format&fit=crop')" 
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Deanna Day Spa
        </h1>
        <p className="mt-4 max-w-lg text-lg text-white/90">
          Rejuvenate Your Body and Soul with Our Premium Beauty Treatments
        </p>
        <button 
          className="mt-8 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-hover hover:bg-opacity-90"
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Services
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
