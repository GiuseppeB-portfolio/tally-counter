# Tally — Counter App

Un contatore interattivo, con interfaccia costruita interamente in JavaScript puro tramite manipolazione del DOM. Nessun framework, nessuna libreria: solo HTML, CSS e JS vanilla.

**🔗 Demo live:** [https://tuo-utente.github.io/counter-app/](https://tuo-utente.github.io/counter-app/) *(sostituisci con il link reale dopo il deploy — vedi sezione [Deploy](#deploy))*

## Anteprima

*(inserisci qui uno screenshot dell'app, es. `![Anteprima dell'app](./screenshot.png)`)*

## Funzionalità

- Contatore che parte da `0` al caricamento della pagina.
- Pulsante **+** per incrementare e pulsante **−** per decrementare il valore.
- Interfaccia (display e pulsanti) generata dinamicamente via JavaScript, senza markup statico nel body.
- **Passo personalizzabile**: si può scegliere di incrementare/decrementare di ±1, ±2, ±5, ±10 o ±25.
- **Salvataggio automatico** del valore e del passo in `localStorage`: ricaricando la pagina il contatore riparte da dove era rimasto.
- Pulsante **Reset** per riportare il contatore a `0`.
- Supporto da tastiera: frecce **↑** / **↓** per incrementare/decrementare.
- Interfaccia accessibile: stati di focus visibili, `aria-live` sul valore, `prefers-reduced-motion` rispettato.
- Design responsive, utilizzabile anche da mobile.

## Tecnologie utilizzate

- **HTML5** — unico markup statico: un contenitore vuoto (`#app`) popolato via JS.
- **CSS3** — variabili CSS, gradienti, animazioni leggere.
- **JavaScript (ES6+)** — puro, senza dipendenze esterne, con logica separata in `script.js`.
- [Google Fonts](https://fonts.google.com/) (*Space Grotesk*, *Share Tech Mono*) per la tipografia.

## Struttura del progetto

```
tally-counter/
├── index.html         # markup minimale, contiene solo il div #app
├── css/
│   └── style.css      # stili dell'interfaccia
├── js/
│   └── script.js       # logica dell'app: creazione DOM, stato, eventi, localStorage
└── README.md
```

Il progetto non utilizza immagini locali (nessuna cartella `img/`): le uniche risorse esterne sono i Google Fonts caricati via CDN.

## Come eseguire il progetto in locale

Non è richiesta alcuna installazione: essendo un progetto statico basta aprire `index.html` in un browser, oppure servirlo con un semplice server locale (consigliato, per evitare eventuali restrizioni del browser su file locali):

```bash
# con Python
python3 -m http.server 8000

# oppure con Node (via npx)
npx serve .
```

e poi visitare `http://localhost:8000`.

## Deploy

Il progetto è statico (HTML/CSS/JS), quindi può essere pubblicato gratuitamente su diverse piattaforme:

- **GitHub Pages**: nelle impostazioni del repository, sezione *Pages*, seleziona il branch `main` e la cartella `/root`. Il sito sarà disponibile su `https://<tuo-utente>.github.io/<nome-repo>/`.
- **Netlify**: trascina la cartella del progetto su [app.netlify.com/drop](https://app.netlify.com/drop), oppure collega il repository GitHub per il deploy automatico.
- **Firebase Hosting**: `firebase init hosting` e poi `firebase deploy`.

Dopo il deploy, aggiorna il link nella sezione "Demo live" in cima a questo README.

## Autore

*(il tuo nome / username GitHub / link al profilo)*

## Licenza

Progetto realizzato a scopo didattico.
