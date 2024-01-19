import { Application, json } from "express";
import express from "express";
import { soundRouter } from "./Routers/sounds.router";


const application: Application = express();

application.use(json());

application.use('/sounds', soundRouter);

application.listen(8081, () => {
    console.log('Prêt et à l\'écoute');
})