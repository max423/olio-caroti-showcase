import { MapPin, Phone, Mail } from "lucide-react";

export const ContattiSection = () => {
  return (
    <section id="contatti" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Content */}
            <div>
              <span className="inline-block mb-4 text-olive-medium font-sans text-sm tracking-[0.2em] uppercase">
                Contatti
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
                Dove Trovarci
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Per informazioni, visite in azienda o per prenotare il vostro olio, 
                non esitate a contattarci. Saremo lieti di accogliervi e farvi 
                scoprire la nostra produzione.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Indirizzo</h4>
                    <p className="text-muted-foreground">
                      Via A. Bertani, 10<br />
                      50137 Firenze, Italy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Telefono</h4>
                    <a 
                      href="tel:+393298399939" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +39 329 839 9939
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Email</h4>
                    <a 
                      href="mailto:info@oliocaroti.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@oliocaroti.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map/Image Placeholder */}
            <div className="relative aspect-square bg-card rounded-sm overflow-hidden shadow-medium">
              {/* Replace this div with a map or location image */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-olive-light/20 to-olive-medium/40 flex items-center justify-center"
                aria-label="Placeholder for map or location image"
              >
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
                  <span className="text-foreground/40 font-sans text-sm tracking-wide uppercase">
                    Mappa / Immagine Sede
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
