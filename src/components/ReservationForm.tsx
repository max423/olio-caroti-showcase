import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Check, Settings, Minus, Plus } from "lucide-react";

const sizes = [
  { value: "0.75", label: "0.75 L" },
  { value: "3", label: "3 L" },
  { value: "5", label: "5 L" },
];

const reservationSchema = z.object({
  name: z.string().min(2, "Il nome deve avere almeno 2 caratteri").max(100),
  email: z.string().email("Inserisci un indirizzo email valido").max(255),
  phone: z.string().min(6, "Inserisci un numero di telefono valido").max(20),
  firenzeSize: z.string(),
  firenzeQty: z.number().min(0).max(99),
  bolgheriSize: z.string(),
  bolgheriQty: z.number().min(0).max(99),
  notes: z.string().max(500).optional(),
}).refine(
  (data) => data.firenzeQty > 0 || data.bolgheriQty > 0,
  {
    message: "Seleziona almeno un tipo di olio",
    path: ["firenzeQty"],
  }
);

type ReservationFormData = z.infer<typeof reservationSchema>;

const WEBHOOK_URL = "";

export const ReservationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWebhookSettings, setShowWebhookSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(WEBHOOK_URL);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firenzeSize: "0.75",
      firenzeQty: 0,
      bolgheriSize: "0.75",
      bolgheriQty: 0,
    },
  });

  const firenzeQty = watch("firenzeQty");
  const bolgheriQty = watch("bolgheriQty");
  const firenzeSize = watch("firenzeSize");
  const bolgheriSize = watch("bolgheriSize");

  const updateQuantity = (field: "firenzeQty" | "bolgheriQty", delta: number) => {
    const currentValue = field === "firenzeQty" ? firenzeQty : bolgheriQty;
    const newValue = Math.max(0, Math.min(99, currentValue + delta));
    setValue(field, newValue);
  };

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    
    const orderDetails = {
      timestamp: new Date().toISOString(),
      nome: data.name,
      email: data.email,
      telefono: data.phone,
      firenze_taglio: data.firenzeQty > 0 ? `${data.firenzeSize} L` : "—",
      firenze_quantita: data.firenzeQty > 0 ? data.firenzeQty : "—",
      bolgheri_taglio: data.bolgheriQty > 0 ? `${data.bolgheriSize} L` : "—",
      bolgheri_quantita: data.bolgheriQty > 0 ? data.bolgheriQty : "—",
      note: data.notes || "",
    };

    console.log("Prenotazione inviata:", orderDetails);

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "no-cors",
          body: JSON.stringify(orderDetails),
        });
        console.log("Dati inviati al webhook");
      } catch (error) {
        console.error("Errore invio webhook:", error);
      }
    }
    
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
              Puoi ordinare da entrambe le nostre olivete.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-background rounded-sm p-8 md:p-12 shadow-medium"
          >
            {/* Dati Personali */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-foreground mb-6 pb-2 border-b border-border">
                I Tuoi Dati
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Il tuo nome"
                  />
                  {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="La tua email"
                  />
                  {errors.email && <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Il tuo numero"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Selezione Olio */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-foreground mb-6 pb-2 border-b border-border">
                Seleziona l'Olio
              </h3>
              
              {errors.firenzeQty && (
                <p className="mb-4 text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-sm">
                  {errors.firenzeQty.message}
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Olio Firenze */}
                <div className={`p-6 rounded-sm border-2 transition-all ${
                  firenzeQty > 0 ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="font-serif text-lg text-foreground">Olio di Firenze</h4>
                      <p className="text-sm text-muted-foreground">Antiche Olivete Fiorentine</p>
                    </div>
                    {firenzeQty > 0 && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                        Taglio (dimensione)
                      </label>
                      <div className="flex gap-2">
                        {sizes.map((size) => (
                          <label key={size.value} className="flex-1 cursor-pointer">
                            <input
                              type="radio"
                              value={size.value}
                              {...register("firenzeSize")}
                              className="peer sr-only"
                            />
                            <div className={`px-3 py-2 text-center text-sm border rounded-sm transition-all ${
                              firenzeSize === size.value
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background hover:border-primary/50"
                            }`}>
                              {size.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                        Quantità (n° lattine)
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => updateQuantity("firenzeQty", -1)}
                          className="w-10 h-10 rounded-sm border border-border bg-background flex items-center justify-center hover:bg-card transition-colors disabled:opacity-50"
                          disabled={firenzeQty === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-serif text-2xl text-foreground w-12 text-center">
                          {firenzeQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity("firenzeQty", 1)}
                          className="w-10 h-10 rounded-sm border border-border bg-background flex items-center justify-center hover:bg-card transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Olio Bolgheri */}
                <div className={`p-6 rounded-sm border-2 transition-all ${
                  bolgheriQty > 0 ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="font-serif text-lg text-foreground">Olio di Bolgheri</h4>
                      <p className="text-sm text-muted-foreground">Castagneto Carducci</p>
                    </div>
                    {bolgheriQty > 0 && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                        Taglio (dimensione)
                      </label>
                      <div className="flex gap-2">
                        {sizes.map((size) => (
                          <label key={size.value} className="flex-1 cursor-pointer">
                            <input
                              type="radio"
                              value={size.value}
                              {...register("bolgheriSize")}
                              className="peer sr-only"
                            />
                            <div className={`px-3 py-2 text-center text-sm border rounded-sm transition-all ${
                              bolgheriSize === size.value
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background hover:border-primary/50"
                            }`}>
                              {size.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                        Quantità (n° lattine)
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => updateQuantity("bolgheriQty", -1)}
                          className="w-10 h-10 rounded-sm border border-border bg-background flex items-center justify-center hover:bg-card transition-colors disabled:opacity-50"
                          disabled={bolgheriQty === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-serif text-2xl text-foreground w-12 text-center">
                          {bolgheriQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity("bolgheriQty", 1)}
                          className="w-10 h-10 rounded-sm border border-border bg-background flex items-center justify-center hover:bg-card transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
                Note (opzionale)
              </label>
              <textarea
                id="notes"
                {...register("notes")}
                rows={3}
                className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Eventuali richieste o informazioni aggiuntive..."
              />
            </div>

            {/* Webhook Settings */}
            <div className="mb-8">
              <button
                type="button"
                onClick={() => setShowWebhookSettings(!showWebhookSettings)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings className="w-4 h-4" />
                Impostazioni Webhook (Google Sheets)
              </button>
              
              {showWebhookSettings && (
                <div className="mt-4 p-4 bg-card rounded-sm border border-border">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    URL Webhook (Zapier/Make.com)
                  </label>
                  <input
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-sm text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://hooks.zapier.com/..."
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Crea un Zap su zapier.com con trigger "Webhook" e azione "Google Sheets - Create Row"
                  </p>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm rounded-sm hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
