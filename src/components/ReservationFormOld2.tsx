import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Check, ShoppingCart, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const reservationSchema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri").max(100),
  email: z.string().email("Inserisci un indirizzo email valido").max(255).optional().or(z.literal("")),
  phone: z.string().min(6, "Inserisci un numero di telefono valido").max(20),
  firenze075: z.number().min(0).max(99),
  firenze3: z.number().min(0).max(99),
  firenze5: z.number().min(0).max(99),
  bolgheri075: z.number().min(0).max(99),
  bolgheri3: z.number().min(0).max(99),
  bolgheri5: z.number().min(0).max(99),
  notes: z.string().max(500).optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Devi accettare l'informativa sulla privacy",
  }),
}).refine(
  (data) => 
    data.firenze075 > 0 || data.firenze3 > 0 || data.firenze5 > 0 ||
    data.bolgheri075 > 0 || data.bolgheri3 > 0 || data.bolgheri5 > 0,
  {
    message: "Seleziona almeno una lattina di olio",
    path: ["firenze075"],
  }
);

type ReservationFormData = z.infer<typeof reservationSchema>;

export const ReservationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    register,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firenze075: 0,
      firenze3: 0,
      firenze5: 0,
      bolgheri075: 0,
      bolgheri3: 0,
      bolgheri5: 0,
      privacy: false,
    },
  });

  const quantities = {
    firenze075: watch("firenze075"),
    firenze3: watch("firenze3"),
    firenze5: watch("firenze5"),
    bolgheri075: watch("bolgheri075"),
    bolgheri3: watch("bolgheri3"),
    bolgheri5: watch("bolgheri5"),
  };

  const updateQuantity = (
    field: keyof typeof quantities,
    delta: number
  ) => {
    const currentValue = quantities[field];
    const newValue = Math.max(0, Math.min(99, currentValue + delta));
    setValue(field, newValue);
  };

  const getTotalLattine = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    
    console.log("Prenotazione:", data);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Prenotazione Inviata!",
      description: "Ti contatteremo presto per confermare la disponibilità.",
    });
  };

  if (isSubmitted) {
    return (
      <section id="prenotazione" className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-gold" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Grazie per la tua prenotazione!
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Abbiamo ricevuto la tua richiesta. Ti contatteremo al più presto 
              per confermare la disponibilità.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                reset();
              }}
              className="px-8 py-4 bg-gold text-olive-dark font-bold tracking-wide uppercase text-sm rounded-sm hover:bg-gold-light transition-all"
            >
              Nuova Prenotazione
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="prenotazione" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-olive-medium font-sans text-sm tracking-[0.2em] uppercase">
              Prenotazione
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Prenota il Tuo Olio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Seleziona le quantità desiderate e compila il form. Ti contatteremo per confermare disponibilità e prezzo.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {/* Dati Personali */}
            <div className="bg-card rounded-lg p-8 shadow-soft">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-olive-medium text-cream flex items-center justify-center text-sm">1</span>
                I Tuoi Dati
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Nome *</label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-3 bg-background border-2 border-border rounded-md focus:border-olive-medium focus:outline-none transition-colors"
                    placeholder="Il tuo nome"
                  />
                  {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 bg-background border-2 border-border rounded-md focus:border-olive-medium focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">Telefono *</label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full px-4 py-3 bg-background border-2 border-border rounded-md focus:border-olive-medium focus:outline-none transition-colors"
                    placeholder="+39 123 456 7890"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Selezione Prodotti */}
            <div className="bg-card rounded-lg p-8 shadow-soft">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-olive-medium text-cream flex items-center justify-center text-sm">2</span>
                Seleziona i Prodotti
              </h3>
              
              {errors.firenze075 && (
                <div className="mb-6 p-4 bg-destructive/10 border-l-4 border-destructive rounded">
                  <p className="text-sm font-medium text-destructive">{errors.firenze075.message}</p>
                </div>
              )}

              <div className="space-y-8">
                {/* Firenze */}
                <div>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-4">Olio di Firenze</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { field: "firenze075" as const, label: "0.75 L" },
                      { field: "firenze3" as const, label: "3 L" },
                      { field: "firenze5" as const, label: "5 L" },
                    ].map(({ field, label }) => (
                      <div key={field} className="flex items-center justify-between bg-background border-2 border-border rounded-md p-4">
                        <span className="font-medium text-foreground">{label}</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(field, -1)}
                            className="w-8 h-8 rounded-md bg-card border border-border hover:bg-muted transition-colors disabled:opacity-30"
                            disabled={quantities[field] === 0}
                          >
                            <Minus className="w-4 h-4 mx-auto" />
                          </button>
                          <span className="font-bold text-xl w-8 text-center">{quantities[field]}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(field, 1)}
                            className="w-8 h-8 rounded-md bg-card border border-border hover:bg-muted transition-colors"
                          >
                            <Plus className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bolgheri */}
                <div>
                  <h4 className="font-serif text-xl font-bold text-foreground mb-4">Olio di Bolgheri</h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { field: "bolgheri075" as const, label: "0.75 L" },
                      { field: "bolgheri3" as const, label: "3 L" },
                      { field: "bolgheri5" as const, label: "5 L" },
                    ].map(({ field, label }) => (
                      <div key={field} className="flex items-center justify-between bg-background border-2 border-border rounded-md p-4">
                        <span className="font-medium text-foreground">{label}</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateQuantity(field, -1)}
                            className="w-8 h-8 rounded-md bg-card border border-border hover:bg-muted transition-colors disabled:opacity-30"
                            disabled={quantities[field] === 0}
                          >
                            <Minus className="w-4 h-4 mx-auto" />
                          </button>
                          <span className="font-bold text-xl w-8 text-center">{quantities[field]}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(field, 1)}
                            className="w-8 h-8 rounded-md bg-card border border-border hover:bg-muted transition-colors"
                          >
                            <Plus className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totale */}
                {getTotalLattine() > 0 && (
                  <div className="bg-gold/10 border-2 border-gold/30 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">Totale Lattine</span>
                      <span className="text-3xl font-serif font-bold text-gold">{getTotalLattine()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="bg-card rounded-lg p-8 shadow-soft">
              <label className="block text-sm font-bold text-foreground mb-3">Note aggiuntive (opzionale)</label>
              <textarea
                {...register("notes")}
                rows={4}
                className="w-full px-4 py-3 bg-background border-2 border-border rounded-md focus:border-olive-medium focus:outline-none transition-colors resize-none"
                placeholder="Eventuali richieste o informazioni..."
              />
            </div>

            {/* Privacy e Submit */}
            <div className="bg-card rounded-lg p-8 shadow-soft space-y-6">
              {/* Privacy */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("privacy")}
                  className="mt-1 w-5 h-5 rounded border-2 border-border text-olive-medium focus:ring-2 focus:ring-gold cursor-pointer"
                />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  Accetto{" "}
                  <Link to="/privacy" target="_blank" className="text-gold hover:underline font-medium">
                    l'informativa sulla privacy
                  </Link>
                  {" "}e autorizzo il trattamento dei miei dati personali per la gestione della prenotazione. *
                </span>
              </label>
              {errors.privacy && (
                <p className="text-sm text-destructive">{errors.privacy.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gold text-olive-dark font-bold tracking-wide uppercase text-base rounded-md hover:bg-gold-light transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Invio in corso...
                  </span>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Invia Prenotazione
                  </>
                )}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Ti contatteremo entro 24-48 ore per confermare la disponibilità e organizzare la consegna.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
