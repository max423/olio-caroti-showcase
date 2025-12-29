export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background - Hero Image con grain */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-olive-dark"
        style={{ backgroundImage: 'url("/static/lending.png")' }}
        aria-label="Oliveto toscano"
      />
      {/* Overlay scuro leggero per stacco moderno */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" style={{backgroundBlendMode:'multiply'}} />
      {/* Grain leggerissimo */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{backgroundImage:'url("/static/grain.png")', opacity:0.08, mixBlendMode:'multiply'}} aria-hidden="true" />

      <div className="relative z-20 container mx-auto px-6 flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-2xl animate-fade-in-up">
          {/* Micro-claim sopra */}
          <div className="mb-4 flex justify-center">
            <span className="font-sans text-base md:text-lg font-semibold tracking-wide px-5 py-2 rounded-full bg-black/10 text-cream/90 uppercase" style={{letterSpacing:'.12em'}}>Firenze · Bolgheri · Produzione limitata</span>
          </div>
          {/* Pannello testuale glass soft su fondo crema */}
          <div className="rounded-xl bg-cream/95 px-8 py-10 flex flex-col items-center gap-6 border border-gold/30" style={{backdropFilter:'saturate(1.1) blur(1.5px)'}}>
            <h1 className="font-serif text-5xl md:text-7xl font-black text-olive-dark text-center tracking-tight" style={{letterSpacing:'-0.04em'}}>
              Olio Caroti
            </h1>
            <p className="font-serif text-xl md:text-2xl text-olive-dark/80 font-medium text-center tracking-tight">
              L’eccellenza dell’olio extravergine toscano, direttamente dal produttore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2 w-full">
              <a
                href="#prenotazione"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-olive-dark font-black uppercase text-base rounded-full hover:bg-gold/80 hover:text-white transition-all duration-300 border-2 border-gold/40 tracking-wide font-serif w-full sm:w-auto justify-center"
              >
                Prenota il tuo olio
              </a>
              <a
                href="#olive"
                className="inline-flex items-center gap-2 px-10 py-4 bg-transparent text-olive-dark font-bold uppercase text-base rounded-full border-2 border-gold/40 hover:bg-gold/10 hover:text-gold transition-all duration-300 tracking-wide font-serif w-full sm:w-auto justify-center"
              >
                Scopri le olivete
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator moderno */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce flex flex-col items-center">
        <svg width="32" height="32" fill="none" viewBox="0 0 32 32" className="text-gold"><path d="M16 6v20M16 26l-6-6m6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="text-xs text-gold mt-1 font-sans">Scorri in basso</span>
      </div>
    </section>
  );
};
