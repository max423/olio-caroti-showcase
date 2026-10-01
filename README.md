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
Il modulo di prenotazione invia i dati a un Google Apps Script. In `index.html` sostituisci i due segnaposto:

```js
const URL='__WEB_APP_URL__', TOKEN='__WEB_APP_TOKEN__';
```

con l'URL dello script e il token (non sono salvati nel repository).

## Pubblicazione
Carica tutti i file (compreso `.htaccess` e la cartella `img/`) nella cartella principale dell'hosting Aruba.

## Versione precedente
Il vecchio sito React/Vite è nel branch `react-2025` (e nel tag `R1`).
