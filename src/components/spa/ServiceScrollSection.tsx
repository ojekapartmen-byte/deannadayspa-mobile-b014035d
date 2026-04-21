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
      <section className="py-20 px-4 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  if (!services?.length) return null;

  return (
    <section className="py-12 w-full">
      {/* Section Header */}
      <div className="px-4 mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">
          {title}{" "}
          {highlight && <span className="italic text-primary font-light">{highlight}</span>}
        </h2>
        <div className="h-1 w-20 bg-primary/20 mt-3 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-primary rounded-full" />
        </div>
      </div>

      {/* Grid/Scroll Container */}
      <div 
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 pb-10 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:snap-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="min-w-[280px] w-[82vw] max-w-[340px] snap-center shrink-0 rounded-[2.2rem] overflow-hidden shadow-2xl relative h-[450px] md:min-w-0 md:w-full md:max-w-none group bg-card"
          >
            {/* Background Image with Zoom Effect */}
            <img
              src={service.image_url || ""}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Content Container */}
            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
              
              {/* Product Info */}
              <div className="mb-4">
                <h3 className="font-display text-lg md:text-xl font-bold text-white leading-tight drop-shadow-md">
                  {service.title}
                </h3>
                <p className="text-[10px] text-white/50 font-body italic mt-1 line-clamp-2 leading-relaxed tracking-wide">
                  {service.description}
                </p>
              </div>

              {/* Service Options (Pricelist) */}
              <div className="space-y-2.5">
                {service.service_options.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center p-3 rounded-[1.25rem] backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/15 transition-all duration-300 min-h-[65px]"
                  >
                    {/* Text Area */}
                    <div className="flex-grow flex flex-col justify-center pr-2">
                      <p className="text-[9px] font-bold text-primary tracking-[0.15em] uppercase mb-0.5 opacity-80">
                        {opt.name}
                      </p>
                      <p className="text-base md:text-lg font-extrabold text-white tracking-tight leading-none">
                        {opt.price}
                      </p>
                    </div>

                    {/* WhatsApp Icon Button */}
                    <a
                      href={getBookingUrl(opt.booking_text, waNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-primary text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-90 hover:rotate-12 group/btn"
                      aria-label="Book via WhatsApp"
                    >
                      <svg 
                        viewBox="0 0 448 512" 
                        fill="currentColor" 
                        className="w-4 h-4"
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
