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
            className="rounded-xl overflow-hidden shadow-card bg-card"
          >
            <div className="relative h-44">
              <img src={service.image_url || ""} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(200 25% 15% / 0.5), transparent 60%)' }} />
              <div className="absolute bottom-3 left-4">
                <h3 className="font-display text-lg text-primary-foreground font-semibold">{service.title}</h3>
                <p className="text-xs text-primary-foreground/80 font-body">{service.description}</p>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {service.service_options.map((opt) => (
                <div key={opt.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-body font-medium text-foreground">{opt.name}</p>
                    <p className="text-xs font-body text-accent font-semibold">{opt.price}</p>
                  </div>
                  <a
                    href={getBookingUrl(opt.booking_text, waNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground text-[10px] font-body font-bold tracking-wider uppercase px-4 py-1.5 rounded-full transition-transform hover:scale-105"
                  >
                    Book
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
