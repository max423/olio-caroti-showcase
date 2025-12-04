import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const reservationSchema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri").max(100),
  email: z.string().email("Inserisci un indirizzo email valido").max(255),
  phone: z.string().min(6, "Inserisci un numero di telefono valido").max(20),
  oilType: z.enum(["firenze", "bolgheri"], {
    required_error: "Seleziona il tipo di olio",
  }),
  quantity: z.enum(["0.75", "3", "5"], {
    required_error: "Seleziona la quantità",
  }),
  notes: z.string().max(500).optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

export const ReservationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Log the reservation data (in production, this would be sent to a backend)
    console.log("Reservation submitted:", data);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Prenotazione Inviata!",
      description: "Ti contatteremo presto per confermare la disponibilità.",
    });
  };

  if (isSubmitted) {
    return (
      <section id="prenotazione" className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-gold" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">
              Grazie per la tua prenotazione!
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Abbiamo ricevuto la tua richiesta. Ti contatteremo al più presto 
              per confermare la disponibilità e organizzare la consegna.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                reset();
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-gold text-olive-dark font-medium tracking-wide uppercase text-sm rounded-sm hover:bg-gold-light transition-all duration-300"
            >
              Nuova Prenotazione
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="prenotazione" className="py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 text-gold font-sans text-sm tracking-[0.2em] uppercase">
              Prenotazione
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary-foreground mb-6">
              Prenota il Tuo Olio
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Compila il modulo per prenotare il tuo olio extra vergine d'oliva. 
              Ti contatteremo per confermare la disponibilità e organizzare la consegna.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-background rounded-sm p-8 md:p-12 shadow-medium"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide"
                >
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Il tuo nome"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="La tua email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide"
                >
                  Telefono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Il tuo numero"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              {/* Oil Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                  Tipo di Olio *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      value="firenze"
                      {...register("oilType")}
                      className="peer sr-only"
                    />
                    <div className="px-4 py-3 bg-card border border-border rounded-sm text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary hover:border-primary/50">
                      <span className="font-medium">Firenze</span>
                    </div>
                  </label>
                  <label className="relative cursor-pointer">
                    <input
                      type="radio"
                      value="bolgheri"
                      {...register("oilType")}
                      className="peer sr-only"
                    />
                    <div className="px-4 py-3 bg-card border border-border rounded-sm text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary hover:border-primary/50">
                      <span className="font-medium">Bolgheri</span>
                    </div>
                  </label>
                </div>
                {errors.oilType && (
                  <p className="mt-2 text-sm text-destructive">{errors.oilType.message}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                  Quantità / Taglio *
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "0.75", label: "0.75 L" },
                    { value: "3", label: "3 L" },
                    { value: "5", label: "5 L" },
                  ].map((option) => (
                    <label key={option.value} className="relative cursor-pointer">
                      <input
                        type="radio"
                        value={option.value}
                        {...register("quantity")}
                        className="peer sr-only"
                      />
                      <div className="px-4 py-3 bg-card border border-border rounded-sm text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary hover:border-primary/50">
                        <span className="font-medium">{option.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.quantity && (
                  <p className="mt-2 text-sm text-destructive">{errors.quantity.message}</p>
                )}
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide"
                >
                  Note (opzionale)
                </label>
                <textarea
                  id="notes"
                  {...register("notes")}
                  rows={4}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Eventuali richieste o informazioni aggiuntive..."
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm rounded-sm hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Invio in corso...
                  </span>
                ) : (
                  "Invia Prenotazione"
                )}
              </button>
              <p className="mt-4 text-sm text-muted-foreground">
                Ti contatteremo entro 24-48 ore per confermare la disponibilità.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
