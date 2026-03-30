import { Phone, MapPin, MessageCircle } from "lucide-react";
import { WA_NUMBER } from "@/data/spaData";

const ContactSection = () => {
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
              <p className="text-sm font-body font-medium text-foreground">+62 819 9923 1518</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-card">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground font-body">Location</p>
              <p className="text-sm font-body font-medium text-foreground">Bali, Indonesia</p>
            </div>
          </div>
        </div>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'd like to make an appointment")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-body font-semibold text-sm tracking-wider uppercase px-8 py-3.5 rounded-full shadow-elevated transition-transform hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" />
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
