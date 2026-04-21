import { motion } from "framer-motion";
import { categories } from "@/data/spaData";

const CategoryScroll = () => {
  return (
    <section className="py-6 px-4 overflow-hidden">
      {/* Mobile: Horizontal Scroll */}
      <div
        className="flex md:hidden gap-4 overflow-x-auto overflow-y-hidden flex-nowrap pb-4 snap-x snap-mandatory scroll-smooth"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center gap-2 min-w-[72px] flex-shrink-0 snap-center"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-border shadow-sm border border-white/50">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover" 
                loading="lazy"
              />
            </div>
            <span className="text-[11px] font-medium text-foreground text-center leading-tight whitespace-normal w-full px-1">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden ring-2 ring-border shadow-md border border-white/50 hover:scale-105 transition-transform">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover" 
                loading="lazy"
              />
            </div>
            <span className="text-sm font-medium text-foreground text-center leading-tight">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryScroll;
