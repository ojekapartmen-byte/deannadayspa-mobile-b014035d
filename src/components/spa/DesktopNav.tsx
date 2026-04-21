import { Home, Scissors, Sparkles, Phone } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: Scissors, label: "Services", href: "#services" },
  { icon: Sparkles, label: "Premium", href: "#premium" },
  { icon: Phone, label: "Contact", href: "#contact" },
];

const DesktopNav = () => {
  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex justify-between items-center h-16 max-w-6xl mx-auto px-6">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-bold text-foreground">
          Deanna Day Spa
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
