import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-olive-dark text-cream/80">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="font-serif text-2xl text-cream mb-4">Olio Caroti</h3>
              <p className="text-sm leading-relaxed text-cream/60">
                Olio extra vergine d'oliva di alta qualità dalla Toscana. 
                Una tradizione di famiglia che continua da generazioni.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-medium text-cream mb-4 uppercase tracking-wide text-sm">
                Navigazione
              </h4>
              <ul className="space-y-2">
                {[
                  { href: "#hero", label: "Home" },
                  { href: "#chi-siamo", label: "Chi Siamo" },
                  { href: "#olive", label: "Le Nostre Olive" },
                  { href: "#contatti", label: "Contatti" },
                  { href: "#prenotazione", label: "Prenota" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium text-cream mb-4 uppercase tracking-wide text-sm">
                Contatti
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                  <span className="text-cream/60">
                    Via A. Bertani, 10<br />
                    50137 Firenze, Italy
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <a
                    href="tel:+393298399939"
                    className="text-cream/60 hover:text-gold transition-colors"
                  >
                    +39 329 839 9939
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                  <a
                    href="mailto:info@oliocaroti.com"
                    className="text-cream/60 hover:text-gold transition-colors"
                  >
                    info@oliocaroti.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-xs text-cream/40">
                © {currentYear} Olio Caroti. Tutti i diritti riservati.
              </p>
              <Link
                to="/privacy"
                className="text-xs text-cream/40 hover:text-gold transition-colors uppercase tracking-wide"
              >
                Privacy Policy
              </Link>
            </div>
            <div />
          </div>
        </div>
      </div>
    </footer>
  );
};
