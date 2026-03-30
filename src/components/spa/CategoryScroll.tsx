import { motion } from "framer-motion";
import { categories } from "@/data/spaData";

const CategoryScroll = () => {
  return (
    <section className="py-6 px-4 overflow-hidden"> {/* Tambahkan overflow-hidden di sini */}
      <div
        className="flex gap-4 overflow-x-auto overflow-y-hidden flex-nowrap pb-4 snap-x snap-mandatory scroll-smooth"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x', // Mengunci gerakan hanya pada sumbu X
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

      {/* CSS internal untuk menyembunyikan scrollbar di Chrome/Safari */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategoryScroll;
