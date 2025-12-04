export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-olive-dark">
        {/* Replace this div with your hero image */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive-medium/80 to-primary/60"
          aria-label="Placeholder for hero image - replace with Tuscan olive grove landscape"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-slide-up">
          <span className="inline-block mb-6 text-gold font-sans text-sm tracking-[0.3em] uppercase">
            Dal cuore della Toscana
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-cream mb-6 leading-tight">
            Olio Caroti
          </h1>
          <p className="font-serif text-xl md:text-2xl text-cream/90 italic mb-4">
            Olio Extravergine di Oliva
          </p>
          <p className="font-sans text-base md:text-lg text-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Olio extra vergine d'oliva di alta qualità, frutto della nostra esperienza nella coltivazione e nella cura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#prenotazione"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-olive-dark font-medium tracking-wide uppercase text-sm rounded-sm hover:bg-gold-light transition-all duration-300 shadow-glow"
            >
              Prenota il Tuo Olio
            </a>
            <a
              href="#chi-siamo"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-cream/40 text-cream font-medium tracking-wide uppercase text-sm rounded-sm hover:bg-cream/10 hover:border-cream/60 transition-all duration-300"
            >
              Scopri di Più
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-cream/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};
