export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid min-h-screen grid-cols-1 items-center md:grid-cols-2 gap-8">
          {/* --- Colonna Testo --- */}
          <div className="relative z-10 flex flex-col items-start justify-center p-6 text-left md:p-10">
            <div className="mb-4">
              <span className="hidden md:inline-block mb-2 text-olive-medium font-sans text-sm tracking-[0.2em] uppercase">
                Produzione Limitata · Biologico
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3">
              Olio Caroti
            </h1>
            <div className="mb-4">
              <span className="font-serif text-base font-medium text-olive-dark/80 tracking-wide">
                Firenze · Bolgheri
              </span>
            </div>

            <p className="mt-4 max-w-lg font-serif text-base leading-relaxed text-black md:text-lg">
              Due territori unici della Toscana, due espressioni diverse dello stesso amore per l'olivo. Il nostro olio è il racconto di una terra e della passione per un'eccellenza senza tempo.
            </p>

            <div className="mt-8">
              <a
                href="#prenotazione"
                className="inline-flex items-center justify-center rounded-full border border-olive-dark bg-transparent px-8 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-olive-dark shadow-sm transition-colors duration-200 hover:bg-olive-dark hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-dark/30"
              >
                PRENOTA IL TUO OLIO
              </a>
            </div>
          </div>

          {/* --- Colonna Immagine (card) --- */}
          <div className="relative flex items-center justify-center">
            <div className="group w-full rounded-sm overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 h-[60vh] md:h-[100vh]">
              <div className="relative h-full aspect-[16/10] overflow-hidden">
                <img
                  src="/static/lending.png"
                  alt="Oliveto toscano"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ filter: 'contrast(1.05) saturate(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/40 to-transparent" />
                <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'url("/static/grain.png")', opacity:0.06, mixBlendMode:'overlay'}} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CTA Scroll Down --- */}
      <a
        href="#olive"
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center"
        aria-label="Scorri per scoprire le olivete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
      </a>
    </section>
  );
};
