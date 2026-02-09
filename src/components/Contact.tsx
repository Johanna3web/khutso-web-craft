import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Let's work together
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Ready to get your business online? Send me a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="text-accent" size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">Email</h4>
                <p className="text-muted-foreground text-sm">hello@khutso.co.za</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="text-accent" size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">WhatsApp</h4>
                <p className="text-muted-foreground text-sm">+27 XX XXX XXXX</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-accent" size={18} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">Location</h4>
                <p className="text-muted-foreground text-sm">South Africa</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                required
                placeholder="Your name"
                maxLength={100}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Your email"
                maxLength={255}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
              />
            </div>
            <div>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project..."
                maxLength={1000}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send size={16} />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
