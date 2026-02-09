import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  popular?: boolean;
  description: string;
  features: string[];
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "R1,200",
    description: "For individuals & students",
    features: [
      "1 page",
      "Portfolio or CV site",
      "Mobile responsive",
      "Contact form",
      "3 revisions",
    ],
  },
  {
    name: "Professional Portfolio",
    price: "R1,800",
    popular: true,
    description: "Best for graduates & professionals",
    features: [
      "3–4 pages",
      "About, Skills, Projects, Contact",
      "Download CV button",
      "WhatsApp button",
      "Modern design",
      "Basic SEO",
    ],
  },
  {
    name: "Business Basic",
    price: "R2,500",
    description: "For small businesses & startups",
    features: [
      "Up to 5 pages",
      "Home, About, Services, Gallery, Contact",
      "WhatsApp button",
      "Google Maps integration",
    ],
  },
];

const addons = [
  { name: "Extra page", price: "R250" },
  { name: "Domain setup", price: "R300" },
  { name: "Hosting setup", price: "R300" },
  { name: "Monthly maintenance", price: "R400/mo" },
  { name: "Logo design", price: "R500" },
  { name: "Content writing", price: "R500" },
  { name: "E-commerce (simple shop)", price: "+R2,000" },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-section-alt">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Pricing</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose the package that fits your needs. Every website is built with care.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-card rounded-xl p-8 flex flex-col shadow-card hover:shadow-card-hover transition-shadow ${
                tier.popular ? "border-2 border-accent" : "border border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} /> Most Popular
                </div>
              )}
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{tier.name}</h3>
              <p className="text-muted-foreground text-sm mb-5">{tier.description}</p>
              <div className="mb-6">
                <span className="font-display text-4xl font-extrabold text-foreground">{tier.price}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3 rounded-lg font-semibold text-sm transition-opacity ${
                  tier.popular
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-display text-xl font-bold text-foreground text-center mb-8">
            Add-ons & Extras
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-3.5"
              >
                <span className="text-sm text-foreground font-medium">{addon.name}</span>
                <span className="text-sm font-bold text-accent">{addon.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
