export const ChiSiamoSection = () => {
  return (
    <section id="chi-siamo" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image Placeholder */}
            <div className="relative aspect-[4/5] bg-card rounded-sm overflow-hidden shadow-medium order-2 md:order-1">
              {/* Replace this div with your image */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-olive-medium/30 to-olive-dark/50 flex items-center justify-center"
                aria-label="Placeholder for company/olive oil image"
              >
                <span className="text-foreground/40 font-sans text-sm tracking-wide uppercase">
                  Immagine Azienda
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <span className="inline-block mb-4 text-olive-medium font-sans text-sm tracking-[0.2em] uppercase">
                Chi Siamo
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                Tradizione e Passione
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  La nostra azienda produce olio extra vergine d'oliva di alta qualità, 
                  ottenuto grazie alla nostra grande esperienza sia nella coltivazione 
                  che nella cura.
                </p>
                <p>
                  La dedizione alla tradizione toscana, unita a tecniche moderne di 
                  spremitura, ci permette di offrire un prodotto che esprime tutto il 
                  carattere del nostro territorio: intenso, fruttato e genuino.
                </p>
                <p>
                  Ogni bottiglia racconta la storia delle nostre colline, il lavoro 
                  paziente delle nostre mani e l'amore per una terra che da generazioni 
                  ci regala frutti straordinari.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <span className="block font-serif text-4xl text-primary">47+</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">Ettari Totali</span>
                </div>
                <div className="w-px h-12 bg-border" />
                <div>
                  <span className="block font-serif text-4xl text-primary">780+</span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">Piante di Olivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
