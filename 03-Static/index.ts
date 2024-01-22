import express, { Application } from "express";

const application: Application = express();

// On dit à express de desservir tous les fichiers dans le dossiers /assets
// à la racine de notre projet. Cependant, avec le premier argument
// on lui d'utiliser /banane comme base pour l'url qui renvoie nos fichiers.
// Ce qui nous donne http://localhost:8001/banane/css/style.css pour récupérer
// le fichier css.
application.use('/banane', express.static(__dirname + '/assets'))

application.get('/', (request, response) => {
    // en commonjs __dirname correspond au chemin absolu
    // vers le dossier contenant le fichier courant 
    response.sendFile(__dirname + '/index.html');
})

application.listen(8001, () => {
    console.log('ça y est, je suis prêt !');
})