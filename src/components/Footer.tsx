const Footer = () => {
  return (
    <footer className="bg-hero py-12">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-lg font-bold text-hero-foreground mb-2">
          Khutso<span className="text-accent">.</span>
        </p>
        <p className="text-hero-muted text-sm mb-6">
          Professional web design for small businesses & individuals.
        </p>
        <div className="border-t border-hero-muted/20 pt-6">
          <p className="text-hero-muted/60 text-xs">
            © {new Date().getFullYear()} Khutso Web Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
