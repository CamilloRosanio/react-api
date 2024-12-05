esercizio di oggi: React Blog Api
repo: react-api


# Esercizio

E’ arrivato il momento di mettere insieme tutti i concetti appresi
Partendo dall'esercizio precedente, integriamo le API che abbiamo sviluppato durante il modulo su ExpressJS. Al caricamento dell'applicazione.
sfruttando l'hook useEffect, recuperiamo la lista dei post dal backend e la mostriamo nella tabella.
Infine Implementiamo la funzionalità di cancellazione


# BONUS:

Durante il submit del form, assicuriamoci che questi dati vengano inviati al backend e correttamente salvati.
Suggerimento: gli oggetti inviati nel body relle richieste vanno trasformati in stringhe con  JSON.stringify . Esempio:


###

{
  method: "POST"
  body: JSON.stringify({ username: "example" }),
}