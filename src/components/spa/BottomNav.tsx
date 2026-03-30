import { Home, Scissors, Sparkles, Phone } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Scissors, label: "Services", href: "#services" },
  { icon: Sparkles, label: "Premium", href: "#premium" },
  { icon: Phone, label: "Contact", href: "#contact" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-elevated">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-body font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
