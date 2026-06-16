export const SITE = {
  name: "VEESUALLY",
  tagline: "Visual Storytelling That Brings Brands To Life.",
  phone: "08146304928",
  phoneIntl: "2348146304928",
  email: "ajokuvictory0032@gmail.com",
  instagram: "veesually_",
  tiktok: "veesually_",
};

export const SERVICES = [
  {
    n: "01",
    title: "Event Coverage",
    desc: "Capturing conferences, seminars, launches, conventions, and special events with cinematic precision.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
  },
  {
    n: "02",
    title: "Corporate Videography",
    desc: "Professional content for businesses, organizations, and institutions that needs to feel considered.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
  },
  {
    n: "03",
    title: "Fashion & Retail Content",
    desc: "Visual content for fashion brands, jewelry stores, watch vendors, fabric retailers, and luxury businesses.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80",
  },
  {
    n: "04",
    title: "Product Videography",
    desc: "High-quality product showcases engineered to increase engagement and drive sales.",
    image: "https://images.unsplash.com/photo-1606293459339-aa5d34a7b0e1?w=1200&q=80",
  },
  {
    n: "05",
    title: "Social Media Content",
    desc: "Short-form content optimized for Instagram, TikTok, and the modern attention economy.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80",
  },
  {
    n: "06",
    title: "Wedding & Pre-Wedding Films",
    desc: "Cinematic storytelling for life's biggest moments — preserved as the films they deserve to be.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },
];

export type Category =
  | "Events"
  | "Corporate"
  | "Fashion"
  | "Retail"
  | "Product Videos"
  | "Weddings"
  | "Interviews"
  | "Social Media Reels";

export const CATEGORIES: Category[] = [
  "Events",
  "Corporate",
  "Fashion",
  "Retail",
  "Product Videos",
  "Weddings",
  "Interviews",
  "Social Media Reels",
];

export const FEATURED = [
  {
    title: "TUS Ireland Pre-Departure Orientation",
    category: "Events" as Category,
    desc: "Event recap content documenting visa preparation, accommodation readiness, employment guidance, student success planning, and educational sessions preparing students for life in Ireland.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1600&q=80",
  },
  {
    title: "Ruby Luxe Fashion & Luxury Brand",
    category: "Fashion" as Category,
    desc: "Promotional content showcasing luxury fabrics, jewelry, wristwatches, native caps, and fashion accessories while covering the grand opening.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
  },
  {
    title: "Fashion Brand Launch Events",
    category: "Retail" as Category,
    desc: "Brand launches, customer experiences, interviews, and promotional highlights captured for retail businesses.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80",
  },
  {
    title: "Church Conventions & Youth Conferences",
    category: "Events" as Category,
    desc: "Highlight videos, interviews, worship coverage, promotional content, and event recaps produced end-to-end.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1600&q=80",
  },
  {
    title: "Jewelry & Watch Campaigns",
    category: "Product Videos" as Category,
    desc: "Luxury product films designed for social media engagement and long-term brand awareness.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600&q=80",
  },
];

export const PORTFOLIO: { title: string; category: Category; image: string }[] = [
  ...FEATURED.map((f) => ({ title: f.title, category: f.category, image: f.image })),
  { title: "Boardroom Interview Series", category: "Corporate", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&q=80" },
  { title: "Atelier Couture Lookbook", category: "Fashion", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80" },
  { title: "Heritage Watch Macro", category: "Product Videos", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80" },
  { title: "Sunset Vows", category: "Weddings", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80" },
  { title: "Founder Conversation", category: "Interviews", image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=1200&q=80" },
  { title: "Concept Store Reel", category: "Social Media Reels", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" },
  { title: "Annual Gala Recap", category: "Events", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80" },
  { title: "Boutique Opening Day", category: "Retail", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80" },
  { title: "Fragrance Story", category: "Product Videos", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80" },
  { title: "Quiet Morning Wedding", category: "Weddings", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1200&q=80" },
];

export const TESTIMONIALS = [
  {
    name: "Adaeze O.",
    industry: "Luxury Retail",
    project: "Brand Launch Film",
    quote:
      "Veesually translated our brand into moving image with extraordinary care. The grand opening film still drives traffic months later.",
  },
  {
    name: "Pastor M. Eke",
    industry: "Faith Organization",
    project: "Convention Highlight Reel",
    quote:
      "Tejiri captured the spirit of the convention in a way photographs simply could not. Our congregation was moved.",
  },
  {
    name: "Ruby Luxe",
    industry: "Fashion House",
    project: "Lookbook & Campaign",
    quote:
      "Every frame feels intentional. Veesually understands luxury — the pacing, the light, the silence between cuts.",
  },
  {
    name: "TUS Ireland Cohort",
    industry: "Education",
    project: "Pre-Departure Recap",
    quote:
      "Professional, calm, and unbelievably fast turnaround. The recap became our most-shared piece of content of the year.",
  },
];

export const CLIENTS = [
  "Ruby Luxe",
  "TUS Ireland",
  "Atelier Couture",
  "Heritage Watches",
  "Concept Store Lagos",
  "Youth Conference",
  "Boardroom Series",
  "Sunset Vows",
];
