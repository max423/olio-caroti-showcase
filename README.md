# Olio Caroti — Showcase

Benvenuto nel repository del sito vetrina di Olio Caroti.

Visita il sito: https://www.oliocaroti.com

Panoramica
- Sito realizzato con Vite, React, TypeScript e Tailwind CSS.
- Risorse statiche (immagini, icone) in `public/static`.

Requisiti
- Node.js 18+ e npm

Installazione (locale)

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

Avvio in sviluppo

```bash
npm run dev
```

Build per produzione

```bash
npm run build
```

Script utili
- `npm run dev` — avvia il server di sviluppo
- `npm run build` — crea la build nella cartella `dist/`
- `npm run preview` — anteprima locale della build
- `npm run generate:favicons` — genera favicon (richiede `sharp` e `png-to-ico`)

Variabili d'ambiente
- `VITE_WEB_APP_URL` — (opzionale) URL del Google Apps Script per le prenotazioni
- `VITE_WEB_APP_TOKEN` — (opzionale) token segreto usato dal client

Deploy
- Copia il contenuto di `dist/` sul tuo hosting (es. Aruba). Per SPA su server statico assicurati che le richieste siano reindirizzate a `index.html` (es. tramite `.htaccess`).

Suggerimenti
- Controlla che il valore di `VITE_WEB_APP_TOKEN` in fase di build corrisponda al token impostato nello script di Google Apps.
- Per produzione valuta di aggiungere protezioni server-side (reCAPTCHA, proxy, rate-limit).


