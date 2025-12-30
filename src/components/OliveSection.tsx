import { MapPin } from "lucide-react";

const oliveGroves = [
  {
    id: "firenze",
    title: "Antiche Olivete Fiorentine",
    location: "Firenze",
    description:
      "L'azienda vanta una proprietà di circa 37 ettari, di cui 6 ettari sono destinati ad oliveta con 780 piante. Le antiche olivete fiorentine producono un olio dal carattere deciso, con note erbacee e un retrogusto leggermente piccante.",
    hectares: "6 ettari",
    plants: "780 piante",
  },
  {
    id: "bolgheri",
    title: "L'Oliveta di Bolgheri",
    location: "Bolgheri",
    description:
      "Su una collina tra Bolgheri e Castagneto Carducci, nella provincia di Livorno, si estende la nostra seconda oliveta con una superficie di 3 ettari e 120 piante. Il microclima costiero dona all'olio un profilo aromatico unico, più delicato e fruttato.",
    hectares: "3 ettari",
    plants: "120 piante",
  },
];

export const OliveSection = () => {
  return (
    <section id="olive" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-olive-medium font-sans text-sm tracking-[0.2em] uppercase">
              I Nostri Territori
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Le nostre olivete
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Due territori unici della Toscana, due espressioni diverse dello stesso amore per l'olivo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {oliveGroves.map((grove) => (
              <div
                key={grove.id}
                className="group bg-background rounded-sm overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500"
              >
                {/* Immagine generica oliveta */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={grove.id === 'firenze'
                      ? '/static/firenze.png'
                      : '/static/bolgheri.png'
                    }
                    alt={`Oliveta a ${grove.location}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/50 to-transparent" />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 text-olive-medium mb-3">
                    <MapPin size={16} />
                    <span className="text-sm font-medium uppercase tracking-wide">
                      {grove.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                    {grove.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {grove.description}
                  </p>
                  <div className="flex items-center gap-6 pt-4 border-t border-border">
                    <div>
                      <span className="block font-serif text-xl text-primary">
                        {grove.hectares}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Superficie
                      </span>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div>
                      <span className="block font-serif text-xl text-primary">
                        {grove.plants}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        Dettaglio
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
