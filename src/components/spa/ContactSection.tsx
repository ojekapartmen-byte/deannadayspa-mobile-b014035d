import { Phone, MapPin, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSpaData";

const ContactSection = () => {
  const { data: content } = useSiteContent();
  const waNumber = content?.wa_number || "6281999231518";
  const address = content?.contact_address || "Bali, Indonesia";
  const email = content?.contact_email || "";

  return (
    <section id="contact" className="py-12 md:py-16 px-4 bg-spa-teal-light pb-24 md:pb-16">
      <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-2">Get in Touch</h2>
        <p className="text-sm md:text-base font-body text-muted-foreground mb-8 md:mb-10">
          Book your appointment or ask us anything
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="flex items-center gap-3 bg-card rounded-xl p-4 md:p-5 shadow-card">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs md:text-sm text-muted-foreground font-body">WhatsApp</p>
              <p className="text-sm md:text-base font-body font-medium text-foreground">+{waNumber.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, '$1 $2 $3 $4')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card rounded-xl p-4 md:p-5 shadow-card">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs md:text-sm text-muted-foreground font-body">Location</p>
              <p className="text-sm md:text-base font-body font-medium text-foreground">{address}</p>
            </div>
          </div>
        </div>

        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hi, I'd like to make an appointment")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm md:text-base tracking-wider uppercase px-8 md:px-12 py-3.5 md:py-4 rounded-full shadow-elevated transition-transform hover:scale-105"
        >
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
