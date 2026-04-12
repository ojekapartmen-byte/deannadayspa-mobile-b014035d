import { Phone, MapPin, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSpaData";

const ContactSection = () => {
  const { data: content } = useSiteContent();
  const waNumber = content?.wa_number || "6281999231518";
  const address = content?.contact_address || "Bali, Indonesia";
  const email = content?.contact_email || "";

  return (
    <section id="contact" className="py-12 px-4 bg-spa-teal-light">
      <div className="max-w-md mx-auto text-center">
        <h2 className="font-display text-2xl text-foreground mb-2">Get in Touch</h2>
        <p className="text-sm font-body text-muted-foreground mb-8">
          Book your appointment or ask us anything
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-body">WhatsApp</p>
              <p className="text-sm font-body font-medium text-foreground">+{waNumber.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, '$1 $2 $3 $4')}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-body">Location</p>
              <p className="text-sm font-body font-medium text-foreground">{address}</p>
            </div>
          </div>
        </div>

        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Hi, I'd like to make an appointment")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wider uppercase px-8 py-3.5 rounded-full shadow-elevated transition-transform hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
