export const WA_NUMBER = "6281999231518";

export const categories = [
  { name: "Massage", image: "https://images.unsplash.com/photo-1649751295468-953038600bef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "Facial", image: "https://images.unsplash.com/photo-1761718209835-c8586b7dcac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "Hair", image: "https://images.unsplash.com/photo-1726555147240-61952754baeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "Nails", image: "https://images.unsplash.com/photo-1636826676107-7fe4e0001117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "Barber", image: "https://images.unsplash.com/photo-1635273051201-003748027b6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "Skin", image: "https://images.unsplash.com/photo-1737063935340-f9af0940c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "Hair Removal", image: "https://images.unsplash.com/photo-1701885881102-de58a9e6e0a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { name: "Lashes & Brows", image: "https://images.unsplash.com/photo-1551512167-b8834db1d639?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
];

export type ServiceOption = {
  name: string;
  price: string;
  bookingText: string;
};

export type Service = {
  title: string;
  description: string;
  image: string;
  options: ServiceOption[];
};

export const pamperPackages: Service[] = [
  {
    title: "Kiddies Spa",
    description: "Spa treatment for kids",
    image: "https://images.unsplash.com/photo-1516815989420-9cb5ef0fce78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    options: [
      { name: "Massage, scrub - yummy chocolate 1 hr", price: "IDR 200.000", bookingText: "Kiddies Spa - Massage, scrub - yummy chocolate 1 hr (IDR.200.000)" },
      { name: "Massage, scrub - yummy chocolate 30 Min", price: "IDR 150.000", bookingText: "Kiddies Spa - Massage, scrub - yummy chocolate 30 Min (IDR. 150.000)" },
      { name: "Nail colour - feet & hand", price: "IDR 150.000", bookingText: "Kiddies Spa - Nail colour - feet & hand (IDR. 150.000)" },
    ],
  },
];

export const premiumServices = [
  {
    title: "LASH & HAIR",
    image: "https://images.unsplash.com/photo-1553103326-609d1bd0ca03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    items: ["Eyelash Extension", "Lash Lift", "Eyebrow Tint", "Eyelash Tint", "Alfaparf Keratin Smoothing", "Hair Braiding / Extension"],
  },
  {
    title: "IV TREATMENT",
    subtitle: "Start from IDR 1,5M",
    image: "https://images.unsplash.com/photo-1763310225009-50214e3c99d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    items: ["Immune Booster", "Anti Oxidant", "Anti Aging", "Bali Belly", "Dengue Recovery"],
  },
  {
    title: "WEDDINGS & SPECIAL OCCASIONS",
    image: "https://images.unsplash.com/photo-1481531010736-287bcfea03d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    items: ["Pre Wedding Bridle Party", "Wedding Day Makeup & Hair", "Birthdays & Parties", "Price Available On Consultation"],
  },
  {
    title: "DEANNA HEALING",
    image: "https://images.unsplash.com/photo-1649751295468-953038600bef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    items: ["Neck & Back", "Sciatica", "Knees, Ankles & Joints", "Frozen Shoulder"],
  },
  {
    title: "LYMPHATIC WOOD THERAPY",
    image: "https://images.unsplash.com/photo-1767043088777-1884c2ef6c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    items: ["Body Sculpting", "Lymphatic Drainage", "Anti Cellulite", "Slimming"],
  },
];

export const massageServices: Service[] = [
  {
    title: "Deanna Signature Massage",
    description: "Combination Balinese, Shiatsu & Lomi-lomi",
    image: "https://images.unsplash.com/photo-1649751295468-953038600bef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    options: [
      { name: "1.5 Hour", price: "IDR 300.000", bookingText: "Deanna Signature Massage - 1.5 Hour (IDR 300.000)" },
      { name: "2 Hour", price: "IDR 380.000", bookingText: "Deanna Signature Massage - 2 Hour (IDR 380.000)" },
    ],
  },
  {
    title: "Balinese Massage",
    description: "Traditional Balinese techniques for deep relaxation.",
    image: "https://images.unsplash.com/photo-1611073615452-4889cb93422e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    options: [
      { name: "1 Hour", price: "IDR 200.000", bookingText: "Balinese Massage - 1 Hour (IDR 200.000)" },
      { name: "1.5 Hour", price: "IDR 280.000", bookingText: "Balinese Massage - 1.5 Hour (IDR 280.000)" },
      { name: "2 Hour", price: "IDR 300.000", bookingText: "Balinese Massage - 2 Hour (IDR 300.000)" },
    ],
  },
  {
    title: "Warm Stone / Bamboo",
    description: "Warm volcanic stones or bamboo tools to melt tension.",
    image: "https://images.unsplash.com/photo-1610402601271-5b4bd5b3eba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    options: [
      { name: "1 Hour", price: "IDR 250.000", bookingText: "Warm Stone or Bamboo Massage - 1 Hour (IDR 250.000)" },
      { name: "1.5 Hour", price: "IDR 300.000", bookingText: "Warm Stone or Bamboo Massage - 1.5 Hour (IDR 300.000)" },
      { name: "2 Hour", price: "IDR 380.000", bookingText: "Warm Stone or Bamboo Massage - 2 Hour (IDR 380.000)" },
    ],
  },
  {
    title: "Cupping Massage",
    description: "Traditional cupping therapy for blood flow & recovery.",
    image: "https://images.unsplash.com/photo-1741522509438-a120c0bb5e88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    options: [
      { name: "1 Hour", price: "IDR 250.000", bookingText: "Cupping Massage - 1 Hour (IDR 250.000)" },
      { name: "1.5 Hour", price: "IDR 300.000", bookingText: "Cupping Massage - 1.5 Hour (IDR 300.000)" },
      { name: "2 Hour", price: "IDR 380.000", bookingText: "Cupping Massage - 2 Hour (IDR 380.000)" },
    ],
  },
];

export const nailServices: Service[] = [
  {
    title: "Manicure",
    description: "Professional nail care for beautifully groomed hands.",
    image: "https://images.unsplash.com/photo-1613457492120-4fcfbb7c3a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    options: [
      { name: "Shellac colour", price: "IDR 300.000", bookingText: "Manicure - Shellac colour (IDR 300.000)" },
      { name: "Normal colour", price: "IDR 200.000", bookingText: "Manicure - Normal colour (IDR 200.000)" },
      { name: "No colour", price: "IDR 180.000", bookingText: "Manicure - With no colour (IDR 180.000)" },
    ],
  },
  {
    title: "Pedicure",
    description: "Relaxing pedicure for soft, pampered feet.",
    image: "https://images.unsplash.com/photo-1659391542239-9648f307c0b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    options: [
      { name: "Shellac colour", price: "IDR 350.000", bookingText: "Pedicure - Shellac colour (IDR 350.000)" },
      { name: "Normal colour", price: "IDR 250.000", bookingText: "Pedicure - Normal colour (IDR 250.000)" },
      { name: "No colour", price: "IDR 200.000", bookingText: "Pedicure - No colour (IDR 200.000)" },
    ],
  },
];

export function getBookingUrl(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I'd like to book ${text}`)}`;
}
