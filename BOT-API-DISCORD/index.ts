import { Application, json } from "express";
import express from "express";
import { soundRouter } from "./Routers/sounds.router";
import { loggerMiddleware } from "./Middlewares/logger.middleware";
import { internalServerErrorHandler } from "./Error-Handler/internal-server-error.handler";
import { notFoundErrorHandler } from "./Error-Handler/not-found-error.handler";
import { NotFoundError } from "./Errors/not-found.error";
import mustacheExpress from "mustache-express";
import { userRouter } from "./Routers/users.router";

// classes => PascalCase
// function => camelCase
// variable => camelCase
// constantes => SCREAMING_SNAKE_CASE
// fichiers => kebab | camelCase | Pascal | ...

const PORT = 8081;

const application: Application = express();

application.engine('mustache', mustacheExpress());
application.set('view engine', 'mustache');
application.set('views', './Views');

application.use(json());
application.use(loggerMiddleware);
application.use('/static', express.static(__dirname + '/uploads'));
application.use('/sounds', soundRouter);
application.use('/users', userRouter);
//override le comportement par défaut pour la 404
application.use((request, response, next) => {
    throw new NotFoundError();
})
application.use(notFoundErrorHandler);
application.use(internalServerErrorHandler);


application.listen(PORT, () => {
    console.log(`Prêt et à l\'écoute sur http://localhost:${PORT}`);
})