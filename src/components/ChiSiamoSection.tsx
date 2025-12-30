import { useEffect, useRef, useState } from "react";

export const ChiSiamoSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const images = [
    { src: "/static/tradizione-carlo.png", alt: "Tradizione Carlo" },
    { src: "/static/tradizione-gigi.png", alt: "Tradizione Gigi" },
  ];

  useEffect(() => {
    const prefersReduced = typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return; // do not animate

    let interval: number | undefined;
    if (!paused) {
      interval = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paused]);

  return (
    <section ref={containerRef} id="chi-siamo" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Images: tradizione-carlo + tradizione-gigi with parallax on scroll */}
            <div
              className="relative aspect-[4/5] bg-card rounded-sm overflow-hidden shadow-medium order-2 md:order-1"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              ref={containerRef}
            >
              {images.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`absolute inset-0 m-auto object-contain max-w-full max-h-full p-4 transition-opacity duration-700 ease-in-out rounded-sm bg-background ${
                    i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
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
