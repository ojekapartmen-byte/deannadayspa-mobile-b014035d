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

const ServiceSection = ({ title, highlight, services, isLoading, waNumber = "6281999231518" }: Props) => {
  if (isLoading) {
    return (
      <section className="py-10 px-4 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </section>
    );
  }

  if (!services?.length) return null;

  return (
    <section className="py-10 px-4">
      <h2 className="font-display text-2xl text-foreground mb-6 px-1">
        {title}{" "}
        {highlight && <span className="italic text-primary">{highlight}</span>}
      </h2>

      <div className="space-y-5">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl overflow-hidden shadow-elevated relative"
          >
            {/* Full-cover background image */}
            <img
              src={service.image_url || ""}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Content over image */}
            <div className="relative z-10 p-4">
              {/* Service title */}
              <h3 className="font-display text-xl text-white font-bold leading-tight mb-1">{service.title}</h3>
              <p className="text-[11px] text-white/70 font-body italic mb-4">{service.description}</p>

              {/* Options with glassmorphism */}
              <div className="space-y-2">
                {service.service_options.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between p-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/15"
                  >
                    <div>
                      <p className="text-sm font-body font-semibold text-white">{opt.name}</p>
                      <p className="text-xs font-body text-white/60 mt-0.5">{opt.price}</p>
                    </div>
                    <a
                      href={getBookingUrl(opt.booking_text, waNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 backdrop-blur-md bg-white/20 border border-white/20 hover:bg-white/30 text-white text-[10px] font-body font-bold tracking-wider uppercase px-4 py-2 rounded-full transition-all active:scale-95"
                    >
                      Booking
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
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

export default ServiceSection;
