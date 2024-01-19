import { Application, Request } from "express";
import express from "express"
import { userRouter } from "./Routers/user.router";

// Crée le serveur express
// comme la méthode createHttpServer
const application: Application = express();

// On dit à notre application de parser les body des requêtes entrantes
// en tant que json
application.use(express.json());

// Toutes les routes du userRouter auront le prefix /users
application.use('/users', userRouter);

// Définir une route qui réagit aux requêtes GET sur la route /banane
application.get('/banane', (request: Request, response) => {
    response.send('Plein de bananes !');
})

// Démarrer notre serveur
application.listen(8001, () => {
    console.log('Je suis prêt et j\'écoute sur le port 8001');
})
