import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Check, Settings, Minus, Plus, ShoppingCart, X, Package, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const sizes = [
  { value: "0.75", label: "0.75 L" },
  { value: "3", label: "3 L" },
  { value: "5", label: "5 L" },
];

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
    message: "Devi accettare l'informativa sulla privacy per continuare",
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

const WEBHOOK_URL = "";

export const ReservationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWebhookSettings, setShowWebhookSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(WEBHOOK_URL);

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

  const firenze075 = watch("firenze075");
  const firenze3 = watch("firenze3");
  const firenze5 = watch("firenze5");
  const bolgheri075 = watch("bolgheri075");
  const bolgheri3 = watch("bolgheri3");
  const bolgheri5 = watch("bolgheri5");

  const updateQuantity = (
    field: "firenze075" | "firenze3" | "firenze5" | "bolgheri075" | "bolgheri3" | "bolgheri5",
    delta: number
  ) => {
    const currentValue = watch(field);
    const newValue = Math.max(0, Math.min(99, currentValue + delta));
    setValue(field, newValue);
  };

  const getTotalLattine = () => {
    return firenze075 + firenze3 + firenze5 + bolgheri075 + bolgheri3 + bolgheri5;
  };

  const onSubmit = async (data: ReservationFormData) => {
    setIsSubmitting(true);
    
    const buildOrderLine = (qty075: number, qty3: number, qty5: number) => {
      const parts = [];
      if (qty075 > 0) parts.push(`${qty075}x 0.75L`);
      if (qty3 > 0) parts.push(`${qty3}x 3L`);
      if (qty5 > 0) parts.push(`${qty5}x 5L`);
      return parts.length > 0 ? parts.join(", ") : "—";
    };

    const orderDetails = {
      timestamp: new Date().toISOString(),
      nome: data.name,
      email: data.email,
      telefono: data.phone,
      firenze_ordine: buildOrderLine(data.firenze075, data.firenze3, data.firenze5),
      bolgheri_ordine: buildOrderLine(data.bolgheri075, data.bolgheri3, data.bolgheri5),
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
    <section id="prenotazione" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 text-olive-medium font-sans text-sm tracking-[0.2em] uppercase">
              Prenotazione
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Prenota il Tuo Olio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Compila il modulo per prenotare il tuo olio extra vergine d'oliva. 
              Ti contatteremo per confermare disponibilità e prezzo.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <div className={`bg-background rounded-sm p-4 sm:p-6 shadow-medium border-2 transition-all ${
                  getTotalLattine() > 0 ? "border-gold" : "border-border"
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-gold" />
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">Riepilogo Ordine</h3>
                    </div>
                    {getTotalLattine() > 0 && (
                      <button
                        type="button"
                        onClick={() => clearSelection()}
                        className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Svuota
                      </button>
                    )}
                  </div>

                  {getTotalLattine() === 0 ? (
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
                      <p className="text-base font-medium text-foreground/70">
                        Nessun prodotto selezionato
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 mb-4">
                        {getOrderSummary().map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-3 border-b-2 border-border/50 last:border-0">
                            <span className="text-base font-medium text-foreground">{item.name}</span>
                            <span className="font-bold text-lg text-foreground">×{item.qty}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t-2 border-gold/30 bg-gold/5 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 rounded-b-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-base sm:text-lg text-foreground">Totale Lattine</span>
                          <span className="font-serif text-3xl sm:text-4xl font-bold text-gold">{getTotalLattine()}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-gold/15 border-2 border-gold/40 rounded-sm p-4">
                  <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                    <strong className="text-gold text-base">💡 Suggerimento:</strong> Puoi ordinare tagli diversi per ogni oliveta. 
                    Ti contatteremo per confermare disponibilità e prezzo finale.
                  </p>
                </div>

                {/* Privacy Checkbox */}
                <div className="mt-6 bg-background/50 border-2 border-border rounded-sm p-4">
                  <label className="flex items-start gap-2 sm:gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register("privacy")}
                      className="mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-foreground/30 text-primary focus:ring-2 focus:ring-gold cursor-pointer flex-shrink-0"
                    />
                    <span className="text-sm sm:text-base font-medium text-foreground leading-relaxed flex-1">
                      Accetto{" "}
                      <Link 
                        to="/privacy" 
                        target="_blank"
                        className="text-gold hover:text-gold-light underline font-bold inline-flex items-center gap-1"
                      >
                        l'informativa sulla privacy
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      {" "}e autorizzo il trattamento dei miei dati personali (nome, telefono, email) per finalità di gestione della prenotazione.*
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="mt-3 text-sm sm:text-base font-bold text-destructive bg-destructive/10 px-3 py-2 rounded">{errors.privacy.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={() => setSubmitAttempted(true)}
                    className="w-full inline-flex items-center justify-center px-6 py-4 sm:py-5 bg-gold text-olive-dark font-bold tracking-wide uppercase text-sm sm:text-base rounded-sm hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border-2 border-gold-light"
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
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Invia Prenotazione
                      </>
                    )}
                  </button>
                  {submitAttempted && getTotalLattine() === 0 && (
                    <p className="mt-3 text-sm sm:text-base font-bold text-destructive text-center bg-destructive/10 py-2 px-3 rounded">
                      Seleziona almeno una lattina per continuare
                    </p>
                  )}
                  <p className="mt-3 text-sm sm:text-base font-medium text-foreground/80 text-center">
                    Ti contatteremo entro 24-48 ore per confermare la disponibilità.
                  </p>
                </div>

                {/* Important Info */}
                <div className="mt-4 bg-gold/15 border-2 border-gold/40 rounded-sm p-4">
                  <p className="text-sm sm:text-base font-medium text-foreground/90 leading-relaxed">
                    <span className="text-2xl">ℹ️</span> <strong className="text-gold text-base sm:text-lg">Importante:</strong> Le prenotazioni vengono processate in ordine di arrivo fino a esaurimento disponibilità. Ti confermeremo la disponibilità dei prodotti selezionati prima della consegna.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-background rounded-sm p-4 sm:p-6 md:p-8 lg:p-10 shadow-medium"
              >
            {/* Dati Personali */}
            <div className="mb-8 sm:mb-10">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 pb-3 border-b-2 border-gold/30">
                I Tuoi Dati
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm sm:text-base font-bold text-foreground mb-2 uppercase tracking-wide">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Il tuo nome"
                  />
                  {errors.name && <p className="mt-2 text-sm font-bold text-destructive bg-destructive/10 px-3 py-2 rounded">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base font-bold text-foreground mb-2 uppercase tracking-wide">
                    Email <span className="text-muted-foreground text-xs sm:text-sm font-medium normal-case">(opzionale)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="La tua email"
                  />
                  {errors.email && <p className="mt-2 text-sm font-bold text-destructive bg-destructive/10 px-3 py-2 rounded">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm sm:text-base font-bold text-foreground mb-2 uppercase tracking-wide">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Il tuo numero"
                  />
                  {errors.phone && <p className="mt-2 text-sm font-bold text-destructive bg-destructive/10 px-3 py-2 rounded">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Selezione Olio */}
            <div className="mb-8 sm:mb-10">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 pb-3 border-b-2 border-gold/30">
                Seleziona l'Olio
              </h3>
              
              {errors.firenze075 && (
                <p className="mb-4 text-sm sm:text-base font-bold text-destructive bg-destructive/10 px-3 sm:px-4 py-3 rounded-sm border-2 border-destructive/30">
                  {errors.firenze075.message}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Olio Firenze */}
                <div className={`p-4 sm:p-6 rounded-sm border-2 transition-all ${
                  getTotalForOlio("firenze") > 0 ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-foreground">Olio di Firenze</h4>
                      <p className="text-sm sm:text-base font-medium text-muted-foreground">Antiche Olivete Fiorentine</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTotalForOlio("firenze") > 0 && (
                        <>
                          <button
                            type="button"
                            onClick={() => clearSelection("firenze")}
                            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                            title="Cancella selezione"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <span className="text-base font-bold text-primary px-3 py-1.5 bg-primary/20 rounded border border-primary/30">
                            {getTotalForOlio("firenze")}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {sizes.map((size) => {
                      const field = `firenze${size.value.replace(".", "")}` as "firenze075" | "firenze3" | "firenze5";
                      const qty = watch(field);
                      
                      return (
                        <div key={size.value} className={`p-3 sm:p-4 rounded-sm border-2 transition-all ${
                          qty > 0 ? "border-primary/30 bg-primary/5" : "border-border"
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <span className="font-bold text-base sm:text-lg text-foreground">{size.label}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <button
                                type="button"
                                onClick={() => updateQuantity(field, -1)}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm border-2 border-border bg-background flex items-center justify-center hover:bg-card transition-colors disabled:opacity-30 active:scale-95"
                                disabled={qty === 0}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-serif text-2xl sm:text-3xl font-bold text-foreground w-12 sm:w-14 text-center">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(field, 1)}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm border-2 border-border bg-background flex items-center justify-center hover:bg-card transition-colors active:scale-95"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Olio Bolgheri */}
                <div className={`p-4 sm:p-6 rounded-sm border-2 transition-all ${
                  getTotalForOlio("bolgheri") > 0 ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div>
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-foreground">Olio di Bolgheri</h4>
                      <p className="text-sm sm:text-base font-medium text-muted-foreground">Castagneto Carducci</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTotalForOlio("bolgheri") > 0 && (
                        <>
                          <button
                            type="button"
                            onClick={() => clearSelection("bolgheri")}
                            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                            title="Cancella selezione"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <span className="text-base font-bold text-primary px-3 py-1.5 bg-primary/20 rounded border border-primary/30">
                            {getTotalForOlio("bolgheri")}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {sizes.map((size) => {
                      const field = `bolgheri${size.value.replace(".", "")}` as "bolgheri075" | "bolgheri3" | "bolgheri5";
                      const qty = watch(field);
                      
                      return (
                        <div key={size.value} className={`p-3 sm:p-4 rounded-sm border-2 transition-all ${
                          qty > 0 ? "border-primary/30 bg-primary/5" : "border-border"
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                              <span className="font-bold text-base sm:text-lg text-foreground">{size.label}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <button
                                type="button"
                                onClick={() => updateQuantity(field, -1)}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm border-2 border-border bg-background flex items-center justify-center hover:bg-card transition-colors disabled:opacity-30 active:scale-95"
                                disabled={qty === 0}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-serif text-2xl sm:text-3xl font-bold text-foreground w-12 sm:w-14 text-center">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(field, 1)}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm border-2 border-border bg-background flex items-center justify-center hover:bg-card transition-colors active:scale-95"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label htmlFor="notes" className="block text-sm sm:text-base font-bold text-foreground mb-2 uppercase tracking-wide">
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
          </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
