# Olio Caroti — sito

Sito statico di [oliocaroti.com](https://www.oliocaroti.com): HTML e CSS scritti a mano, nessuna build.

## File
| File | Cosa contiene |
|---|---|
| `index.html` | Home "Manifesto": copertina, olivete, famiglia, buono di prenotazione |
| `privacy.html`, `cookie.html` | Informativa privacy e cookie |
| `img/` | Foto di famiglia |
| `.htaccess` | Reindirizza i vecchi indirizzi (`/privacy`, `/cookie`) |
| `robots.txt`, `sitemap.xml`, `og-image.jpg`, favicon | SEO e anteprime |

## Prima di pubblicare
Il modulo di prenotazione invia i dati a un webhook Discord (canale privato delle prenotazioni). In `index.html` sostituisci il segnaposto:

```js
const WEBHOOK='__DISCORD_WEBHOOK__';
```

con l'URL del webhook (non è salvato nel repository).

## Pubblicazione
Carica tutti i file (compreso `.htaccess` e la cartella `img/`) nella cartella principale dell'hosting Aruba.

## Versione precedente
Il vecchio sito React/Vite è nel branch `react-2025` (e nel tag `R1`).
