import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Check, ShoppingCart, Minus, Plus, User, Mail, Phone, MessageSquare, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const reservationSchema = z.object({
  name: z.string().min(2, "Nome troppo corto").max(100),
  email: z.string().email("Email non valida").max(255).optional().or(z.literal("")),
  phone: z.string().min(6, "Telefono non valido").max(20),
  firenze075: z.number().min(0).max(99),
  firenze3: z.number().min(0).max(99),
  firenze5: z.number().min(0).max(99),
  bolgheri075: z.number().min(0).max(99),
  bolgheri3: z.number().min(0).max(99),
  bolgheri5: z.number().min(0).max(99),
  notes: z.string().max(500).optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Accetta la privacy per continuare",
  }),
}).refine(
  (data) => 
    data.firenze075 > 0 || data.firenze3 > 0 || data.firenze5 > 0 ||
    data.bolgheri075 > 0 || data.bolgheri3 > 0 || data.bolgheri5 > 0,
  {
    message: "Seleziona almeno un prodotto",
    path: ["firenze075"],
  }
);

type ReservationFormData = z.infer<typeof reservationSchema>;

const ProductCard = ({ 
  label, 
  size,
  value, 
  onIncrease, 
  onDecrease 
}: { 
  label: string; 
  size: '075' | '3' | '5';
  value: number; 
  onIncrease: () => void; 
  onDecrease: () => void;
}) => {
  return (
    <div className={`relative rounded-xl transition-all duration-200 ${
      value > 0 
        ? 'bg-olive-medium border-2 border-olive-dark shadow-lg' 
        : 'bg-white border-2 border-gray-300 hover:border-olive-medium'
    }`}>
      <div className="p-4">
        {/* Header con label e badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`font-bold text-lg ${value > 0 ? 'text-white' : 'text-gray-900'}`}>
            {label}
          </span>
          {value > 0 && (
            <span className="bg-white text-olive-dark px-2.5 py-1 rounded-full text-sm font-bold">
              {value}
            </span>
          )}
        </div>
        
        {/* Type indicator */}
        <div className="mb-3">
          <span className={`text-xs font-medium ${value > 0 ? 'text-white/80' : 'text-gray-500'}`}>
            {size === '075' ? 'Bottiglia' : 'Lattina'}
          </span>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDecrease}
            disabled={value === 0}
            className={`flex-1 h-10 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 font-semibold ${
              value > 0 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onIncrease}
            className={`flex-1 h-10 rounded-lg transition-all duration-200 flex items-center justify-center active:scale-95 font-semibold shadow-sm ${
              value > 0 
                ? 'bg-white text-olive-dark hover:bg-white/90' 
                : 'bg-olive-medium hover:bg-olive-dark text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ReservationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCooldown, setSubmitCooldown] = useState(false);

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

  const getTotalLattine = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const onSubmit = async (data: ReservationFormData) => {
    // Leggi l'URL del Web App e la chiave segreta da variabili d'ambiente (Vite)
    const WEB_APP_URL = (import.meta.env.VITE_WEB_APP_URL as string | undefined) || '';
    const WEB_APP_TOKEN = (import.meta.env.VITE_WEB_APP_TOKEN as string | undefined) || '';

    setIsSubmitting(true);
    if (!WEB_APP_URL) {
      toast({ title: 'Errore di configurazione', description: 'WEB_APP_URL non impostata.' });
      setIsSubmitting(false);
      return;
    }

    try {
        const NOTES_MAX = 500;

        // Honeypot anti-bot field (registered as hp)
        // If filled, likely a bot -> abort
        // (note: register('hp') added to the form below)
        const hpValue = (data as any).hp || '';
        if (hpValue && hpValue.trim().length > 0) {
          toast({ title: 'Spam rilevato', description: 'Operazione non consentita' });
          setIsSubmitting(false);
          return;
        }

        // Enforce max length on notes (defensive check)
        const rawNotes = (data.notes || '').toString();
        if (rawNotes.length > NOTES_MAX) {
          toast({ title: 'Errore', description: `Note troppo lunghe (max ${NOTES_MAX} caratteri).` });
          setIsSubmitting(false);
          return;
        }

        // Basic sanitization: strip HTML tags to reduce injection risk
        const sanitize = (s: string) => s.replace(/<[^>]*>/g, '').trim();

        const payload = {
          token: WEB_APP_TOKEN,
          name: sanitize(String(data.name || '')),
          phone: sanitize(String(data.phone || '')),
          email: sanitize(String(data.email || '')),
          quantities,
          notes: sanitize(rawNotes),
          total: getTotalLattine(),
        };

      // Diagnostic logs (temporary)
      console.log('ReservationForm: posting to', WEB_APP_URL);
      console.log('ReservationForm: payload (token hidden)', { ...payload, token: payload.token ? '***present***' : '***missing***' });

      // Send raw JSON but OMIT the Content-Type header so the browser uses a simple request
      // (text/plain) and avoids the CORS preflight OPTIONS that can cause 405 on Apps Script.
      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      let json: any = {};
      let textBody = '';
      try {
        json = await res.json();
      } catch (e) {
        textBody = await res.text().catch(() => '');
      }

      if (res.ok && json.status === 'ok') {
        setIsSubmitted(true);
        toast({ title: 'Prenotazione Inviata!', description: 'Ti contatteremo presto per confermare.' });
        setTimeout(() => {
          const el = document.getElementById('prenotazione');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        // Apply a short cooldown to limit rapid repeated submissions from client
        setSubmitCooldown(true);
        setTimeout(() => setSubmitCooldown(false), 30 * 1000); // 30s
      } else {
        const msg = (json && json.message) || textBody || `Errore HTTP ${res.status}`;
        console.error('ReservationForm: non OK response', res.status, msg, json, textBody);
        toast({ title: 'Errore', description: msg });
      }
    } catch (err: any) {
      console.error('ReservationForm: fetch error', err);
      toast({ title: 'Errore di rete', description: err?.message || 'Impossibile contattare il server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="prenotazione" className="py-16 md:py-24 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-lg mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={3} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 md:mb-6">
              Grazie!
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              La tua prenotazione è stata inviata con successo. Ti contatteremo entro 24 ore per confermare disponibilità e organizzare la consegna.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                reset();
              }}
              className="px-6 md:px-8 py-3 md:py-4 bg-olive-medium text-white font-semibold rounded-xl hover:bg-olive-dark transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 touch-manipulation text-sm md:text-base"
            >
              Nuova Prenotazione
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="prenotazione" className="py-16 md:py-24 bg-gradient-to-b from-cream to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-olive-medium/10 rounded-full">
              <ShoppingCart className="w-4 h-4 text-olive-medium" />
              <span className="text-olive-medium font-semibold text-sm tracking-wider uppercase">Prenotazione</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 md:mb-4">
              Prenota il Tuo Olio
            </h2>
            <p className="text-black max-w-2xl mx-auto text-base md:text-lg">
              Seleziona le quantità e completa i tuoi dati. Ti contatteremo per confermare. Le prenotazioni sono processate in ordine cronologico.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
            

            {/* Grid Layout per Desktop */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {/* Colonna Sinistra - Form Dati */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                {/* Dati Personali */}
                <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-olive-medium text-white flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900">I Tuoi Dati</h3>
                  </div>
                  
                  <div className="space-y-4 md:space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2">
                        <User className="w-4 h-4" />
                        Nome Completo *
                      </label>
                      <input
                        {...register("name")}
                        className="w-full px-4 py-3 md:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-olive-medium focus:bg-white focus:outline-none transition-all text-base touch-manipulation text-black"
                        placeholder="Mario Rossi"
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600 flex items-center gap-1"><span className="font-bold">⚠</span> {errors.name.message}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2">
                          <Phone className="w-4 h-4" />
                          Telefono *
                        </label>
                        <input
                          type="tel"
                          {...register("phone")}
                          className="w-full px-4 py-3 md:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-olive-medium focus:bg-white focus:outline-none transition-all text-base touch-manipulation text-black"
                          placeholder="+39 123 456 7890"
                        />
                        {errors.phone && <p className="mt-2 text-sm text-red-600 flex items-center gap-1"><span className="font-bold">⚠</span> {errors.phone.message}</p>}
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          className="w-full px-4 py-3 md:py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-olive-medium focus:bg-white focus:outline-none transition-all text-base touch-manipulation text-black"
                          placeholder="email@esempio.it"
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600 flex items-center gap-1"><span className="font-bold">⚠</span> {errors.email.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selezione Prodotti */}
                <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-olive-medium text-white flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-gray-900">Seleziona i Prodotti</h3>
                  </div>

                  {errors.firenze075 && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                      <p className="text-sm font-medium text-red-800"><span className="font-bold">⚠</span> {errors.firenze075.message}</p>
                    </div>
                  )}

                  <div className="space-y-8">
                    {/* Olivete Fiorentine */}
                    <div className="bg-gradient-to-br from-olive-light/5 via-white to-olive-medium/5 rounded-2xl p-6 border border-olive-medium/20">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-olive-medium/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-olive-dark" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-serif text-xl font-bold text-olive-dark">Olivete Fiorentine</h4>
                          <p className="text-xs text-black">Firenze</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ProductCard 
                          label="0.75 L" 
                          size="075"
                          value={quantities.firenze075}
                          onIncrease={() => setValue("firenze075", Math.min(99, quantities.firenze075 + 1))}
                          onDecrease={() => setValue("firenze075", Math.max(0, quantities.firenze075 - 1))}
                        />
                        <ProductCard 
                          label="3 L" 
                          size="3"
                          value={quantities.firenze3}
                          onIncrease={() => setValue("firenze3", Math.min(99, quantities.firenze3 + 1))}
                          onDecrease={() => setValue("firenze3", Math.max(0, quantities.firenze3 - 1))}
                        />
                        <ProductCard 
                          label="5 L" 
                          size="5"
                          value={quantities.firenze5}
                          onIncrease={() => setValue("firenze5", Math.min(99, quantities.firenze5 + 1))}
                          onDecrease={() => setValue("firenze5", Math.max(0, quantities.firenze5 - 1))}
                        />
                      </div>
                    </div>

                    {/* Oliveta di Bolgheri */}
                    <div className="bg-gradient-to-br from-gold/5 via-white to-gold-light/10 rounded-2xl p-6 border border-gold/30">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-olive-dark" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-serif text-xl font-bold text-olive-dark">Oliveta di Bolgheri</h4>
                          <p className="text-xs text-black">Bolgheri</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ProductCard 
                          label="0.75 L" 
                          size="075"
                          value={quantities.bolgheri075}
                          onIncrease={() => setValue("bolgheri075", Math.min(99, quantities.bolgheri075 + 1))}
                          onDecrease={() => setValue("bolgheri075", Math.max(0, quantities.bolgheri075 - 1))}
                        />
                        <ProductCard 
                          label="3 L" 
                          size="3"
                          value={quantities.bolgheri3}
                          onIncrease={() => setValue("bolgheri3", Math.min(99, quantities.bolgheri3 + 1))}
                          onDecrease={() => setValue("bolgheri3", Math.max(0, quantities.bolgheri3 - 1))}
                        />
                        <ProductCard 
                          label="5 L" 
                          size="5"
                          value={quantities.bolgheri5}
                          onIncrease={() => setValue("bolgheri5", Math.min(99, quantities.bolgheri5 + 1))}
                          onDecrease={() => setValue("bolgheri5", Math.max(0, quantities.bolgheri5 - 1))}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg border border-gray-100">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <MessageSquare className="w-4 h-4" />
                    Note Aggiuntive (opzionale)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-olive-medium focus:bg-white focus:outline-none transition-all resize-none text-base touch-manipulation text-black"
                    placeholder="Eventuali richieste particolari..."
                  />
                </div>
                {/* Riepilogo Mobile - Solo se ci sono prodotti (spostato qui per apparire dopo le note su smartphone) */}
                {getTotalLattine() > 0 && (
                  <div className="md:hidden bg-gradient-to-r from-gold/20 to-gold-light/20 rounded-2xl p-4 border-2 border-gold/30 mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-olive-medium" />
                      Riepilogo
                    </h4>
                    <div className="space-y-2 mb-3">
                      {Object.entries(quantities).map(([key, qty]) => {
                        if (qty === 0) return null;
                        const labels: Record<string, string> = {
                          firenze075: "Firenze 0.75L",
                          firenze3: "Firenze 3L",
                          firenze5: "Firenze 5L",
                          bolgheri075: "Bolgheri 0.75L",
                          bolgheri3: "Bolgheri 3L",
                          bolgheri5: "Bolgheri 5L",
                        };
                        return (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-600">{labels[key]}</span>
                            <span className="font-semibold text-gray-900">×{qty}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between border-t border-gold/20 pt-3">
                      <span className="text-sm text-gray-700 font-medium">Totale</span>
                      <span className="text-lg font-bold text-gold">{getTotalLattine()}</span>
                    </div>

                    {/* Nota informativa visibile anche su mobile */}
                    <div className="mt-4 p-3 bg-white rounded-lg border border-gray-100">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>Nota:</strong> Ti contatteremo per confermare disponibilità e prezzo finale.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Colonna Destra - Riepilogo Desktop */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Riepilogo Desktop */}
                  <div className="hidden md:block bg-white rounded-2xl p-6 shadow-xl border-2 border-olive-medium/20">
                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-olive-medium" />
                      Riepilogo
                    </h3>
                    
                    {getTotalLattine() === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <ShoppingCart className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500">Nessun prodotto selezionato</p>
                      </div>
                    ) : (
                      <div>
                        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                          {Object.entries(quantities).map(([key, qty]) => {
                            if (qty === 0) return null;
                            const labels: Record<string, string> = {
                              firenze075: "Firenze 0.75L",
                              firenze3: "Firenze 3L",
                              firenze5: "Firenze 5L",
                              bolgheri075: "Bolgheri 0.75L",
                              bolgheri3: "Bolgheri 3L",
                              bolgheri5: "Bolgheri 5L",
                            };
                            return (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="text-gray-600">{labels[key]}</span>
                                <span className="font-semibold text-gray-900">×{qty}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="bg-gradient-to-r from-gold/20 to-gold-light/20 rounded-xl p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800">Totale</span>
                            <span className="text-3xl font-bold text-gold">{getTotalLattine()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Box */}
                  <div className="hidden md:block bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-blue-800 leading-relaxed">
                      <strong>Nota:</strong> Ti contatteremo per confermare disponibilità e prezzo finale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy e Submit */}
            <div className="bg-white rounded-2xl p-5 md:p-8 shadow-lg border border-gray-100 space-y-5">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("privacy")}
                  className="mt-1 w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 border-gray-300 text-olive-medium focus:ring-2 focus:ring-gold/50 cursor-pointer transition-all touch-manipulation"
                />
                <span className="text-sm md:text-base text-gray-600 leading-relaxed flex-1">
                  <Shield className="w-4 h-4 inline mr-1 text-olive-medium" />
                  Accetto{" "}
                  <Link to="/privacy" className="text-olive-medium hover:text-olive-dark font-semibold underline">
                    l'informativa sulla privacy
                  </Link>
                  {" "}e autorizzo il trattamento dei dati per la gestione della prenotazione.
                </span>
              </label>
              {errors.privacy && (
                <p className="text-sm text-red-600 flex items-center gap-1"><span className="font-bold">⚠</span> {errors.privacy.message}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 md:py-5 bg-gradient-to-r from-olive-medium to-olive-dark text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg active:scale-98 touch-manipulation"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Invia Prenotazione
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                Ti contatteremo entro 24-48 ore
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
