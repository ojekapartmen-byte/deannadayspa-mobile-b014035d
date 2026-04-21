import { motion } from "framer-motion";
import { getBookingUrl, type DbService } from "@/hooks/useSpaData";
import { Loader2 } from "lucide-react";

type Props = {
  title: string;
  highlight?: string;
  services: DbService[] | undefined;
  isLoading?: boolean;
  waNumber?: string;
};

const ServiceScrollSection = ({ title, highlight, services, isLoading, waNumber = "6281999231518" }: Props) => {
  if (isLoading) {
    return (
      <section className="py-10 px-4 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </section>
    );
  }

  if (!services?.length) return null;

  return (
    <section className="py-10">
      <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8 px-4">
        {title}{" "}
        {highlight && <span className="italic text-primary">{highlight}</span>}
      </h2>

      {/* Container: Scroll di Mobile, Grid di Desktop */}
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 pb-6 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:snap-none">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="min-w-[300px] w-[85vw] max-w-[340px] snap-center shrink-0 rounded-3xl overflow-hidden shadow-xl relative h-[400px] md:min-w-0 md:w-full md:max-w-none group"
          >
            {/* Background Image */}
            <img
              src={service.image_url || ""}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            {/* Content Layer */}
            <div className="relative z-10 p-5 h-full flex flex-col justify-end">
              <div className="mb-4">
                <h3 className="font-display text-2xl text-white font-bold leading-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-white/70 font-body italic line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Options Section (Harga Dominan & Ikon WA) */}
              <div className="space-y-3">
                {service.service_options.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <div className="flex-grow">
                      <p className="text-[10px] font-bold text-primary-foreground/60 uppercase tracking-widest">
                        {opt.name}
                      </p>
                      <p className="text-lg md:text-xl font-extrabold text-white mt-0.5 tracking-tight">
                        {opt.price}
                      </p>
                    </div>

                    {/* Minimalist Icon Button */}
                    <a
                      href={getBookingUrl(opt.booking_text, waNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 bg-primary text-primary-foreground rounded-full transition-all active:scale-90 shadow-lg hover:rotate-12 group/btn"
                    >
                      <svg 
                        viewBox="0 0 448 512" 
                        fill="currentColor" 
                        className="w-5 h-5 transition-transform group-hover/btn:scale-110"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.3-5-3.7-10.5-6.6z"/>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceScrollSection;
