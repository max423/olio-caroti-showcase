import { Phone, Mail } from "lucide-react";

export const ContattiSection = () => {
  return (
    <section id="contatti" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 text-olive-medium font-sans text-sm tracking-[0.2em] uppercase">
            Contatti
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            Contattaci
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-12">
            Per informazioni o per prenotare il vostro olio, non esitate a contattarci.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-foreground mb-1">Telefono</h4>
                <a 
                  href="tel:+393298399939" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +39 329 839 9939
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
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
      </div>
    </section>
  );
};
