import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white border-b border-black/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-black/90 hover:text-black/70 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Torna alla Home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-4">
          Informativa sulla Privacy
        </h1>
        <p className="text-sm sm:text-base text-black/70 mb-6 sm:mb-8">
          Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
        </p>

        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="font-serif text-2xl text-black mb-4">
              1. Titolare del Trattamento
            </h2>
            <p className="text-black/70 leading-relaxed mb-4">
              Il Titolare del trattamento dei dati personali è <strong>Olio Caroti</strong>, 
              che può essere contattato tramite il modulo di prenotazione presente sul sito.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              2. Dati Personali Raccolti
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Attraverso il modulo di prenotazione presente sul sito, raccogliamo i seguenti dati personali:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
              <li><strong>Nome:</strong> necessario per identificare il cliente</li>
              <li><strong>Numero di telefono:</strong> utilizzato per contattarti riguardo la tua prenotazione</li>
              <li><strong>Indirizzo email (opzionale):</strong> utilizzato per comunicazioni alternative</li>
              <li><strong>Note sulla prenotazione:</strong> eventuali richieste o informazioni aggiuntive</li>
              <li><strong>Dettagli dell'ordine:</strong> tipo e quantità di olio prenotato</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              3. Finalità del Trattamento
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              I tuoi dati personali vengono raccolti e trattati esclusivamente per le seguenti finalità:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
              <li>Gestione della prenotazione dell'olio extra vergine d'oliva</li>
              <li>Comunicazioni relative alla disponibilità dei prodotti</li>
              <li>Conferma e organizzazione della consegna</li>
              <li>Risposta a eventuali richieste o domande specificate nelle note</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              4. Base Giuridica del Trattamento
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Il trattamento dei tuoi dati personali si basa sul tuo <strong>consenso esplicito</strong>, 
              espresso mediante l'accettazione dell'informativa privacy al momento dell'invio del modulo di prenotazione.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              5. Modalità di Trattamento
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              I dati personali sono trattati con strumenti informatici e/o telematici, 
              con logiche strettamente correlate alle finalità indicate e comunque in modo da garantire 
              la sicurezza e la riservatezza dei dati stessi.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              6. Conservazione dei Dati
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              I tuoi dati personali saranno conservati per il tempo strettamente necessario 
              alla gestione della prenotazione e per un periodo successivo non superiore a 
              quanto previsto dalle normative fiscali e contabili vigenti.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              7. Comunicazione e Diffusione dei Dati
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              I tuoi dati personali <strong>non saranno comunicati a terzi</strong> né diffusi, 
              salvo che per adempiere a specifici obblighi di legge o per gestire la consegna dei prodotti.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              8. Diritti dell'Interessato
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              In qualità di interessato, hai il diritto di:
            </p>
            <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">
              <li>Accedere ai tuoi dati personali</li>
              <li>Chiedere la rettifica dei dati inesatti</li>
              <li>Richiedere la cancellazione dei dati (diritto all'oblio)</li>
              <li>Limitare il trattamento dei dati</li>
              <li>Opporti al trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Per esercitare questi diritti, puoi contattarci tramite i recapiti forniti sul sito.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              9. Modifiche alla Privacy Policy
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Ci riserviamo il diritto di modificare questa informativa sulla privacy in qualsiasi momento. 
              Le modifiche saranno pubblicate su questa pagina con aggiornamento della data in alto.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              10. Gestione delle Prenotazioni
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Le prenotazioni vengono processate in ordine di arrivo fino a esaurimento della disponibilità. 
              Ti contatteremo per confermare la disponibilità dei prodotti selezionati prima di procedere con la consegna.
            </p>
          </section>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-black/10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white font-medium tracking-wide uppercase text-xs sm:text-sm rounded-sm hover:opacity-95 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alla Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/10 py-6 mt-8 sm:mt-12">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-6xl">
          <p className="text-black/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} Olio Caroti. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
