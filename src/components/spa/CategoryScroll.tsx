import { motion } from "framer-motion";
import { categories } from "@/data/spaData";

const CategoryScroll = () => {
  return (
    <section className="py-8 px-4">
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center gap-2 min-w-[72px] snap-center"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-border shadow-card">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-body font-medium text-foreground text-center leading-tight">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryScroll;
