import { motion } from "framer-motion";
import { usePremiumServices, useSiteContent, getBookingUrl } from "@/hooks/useSpaData";
import { Loader2 } from "lucide-react";

const PremiumCards = () => {
  const { data: premiums, isLoading } = usePremiumServices();
  const { data: content } = useSiteContent();
  const waNumber = content?.wa_number || "6281999231518";

  if (isLoading) {
    return (
      <section className="py-10 px-4 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </section>
    );
  }

  if (!premiums?.length) return null;

  return (
    <section className="py-10 px-4">
      <h2 className="font-display text-2xl text-foreground mb-6 px-1">
        Premium & Beauty <span className="italic text-primary">Rejuvenation</span>
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:snap-none">
        {premiums.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="min-w-[280px] max-w-[280px] rounded-xl overflow-hidden shadow-card bg-card flex-shrink-0 snap-center md:min-w-0 md:max-w-none md:w-full lg:max-w-[320px] xl:max-w-none"
          >
            <div className="relative h-40">
              <img src={service.image_url || ""} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-display text-base text-primary-foreground font-semibold">{service.title}</h3>
                {service.subtitle && (
                  <p className="text-xs text-primary-foreground/80 font-body mt-0.5">{service.subtitle}</p>
                )}
              </div>
            </div>
            <div className="p-4">
              <ul className="space-y-1.5 mb-4">
                {(service.items ?? []).map((item) => (
                  <li key={item} className="text-xs font-body text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={getBookingUrl(service.title, waNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase py-2.5 rounded-lg transition-transform hover:scale-[1.02]"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PremiumCards;
