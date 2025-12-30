import { Phone, Mail } from "lucide-react";

export const ContattiSection = () => {
  return (
    <section id="contatti" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block mb-4 text-olive-medium font-sans text-sm tracking-[0.2em] uppercase">
              Contatti
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4 md:mb-6">
              Contattaci
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Per informazioni o per prenotare il vostro olio, non esitate a contattarci.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Immagine con cornice decorativa */}
            <div className="mx-auto w-full max-w-md">
              <figure className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
                <div
                  className="absolute -inset-3 -z-10 transform rotate-2 rounded-2xl border-2 border-gold/30 bg-cream/95"
                  aria-hidden="true"
                />
                <img
                  src="/static/mockup.png"
                  alt="Mockup della bottiglia Olio Caroti"
                  className="h-full w-full object-cover rounded-2xl"
                  loading="lazy"
                />
                <figcaption className="sr-only">Mockup del prodotto Olio Caroti</figcaption>
              </figure>
            </div>

            {/* Card contatti */}
            <div className="bg-background rounded-sm overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-foreground mb-1">Telefono</h4>
                    <a href="tel:+393298399939" className="text-muted-foreground hover:text-primary transition-colors">
                      +39 329 839 9939
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-foreground mb-1">Email</h4>
                    <a href="mailto:info@oliocaroti.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@oliocaroti.com
                    </a>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
