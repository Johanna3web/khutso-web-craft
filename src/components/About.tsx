import { motion } from "framer-motion";
import { Code, Smartphone, Zap } from "lucide-react";

const features = [
  { icon: Code, title: "Clean Code", desc: "Modern, well-structured websites built with the latest technologies." },
  { icon: Smartphone, title: "Mobile First", desc: "Every site is fully responsive and looks great on any device." },
  { icon: Zap, title: "Fast & Reliable", desc: "Optimized for speed and performance to keep your visitors engaged." },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">About Me</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Turning ideas into digital reality
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I design clean, modern and affordable websites for individuals, small businesses and startups. I help brands go online with professional websites that convert visitors into customers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <f.icon className="text-accent" size={22} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
