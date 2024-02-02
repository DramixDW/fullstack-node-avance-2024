import { Application, json } from "express";
import express from "express";
import { soundRouter } from "./Api/Routers/sounds.router";
import { loggerMiddleware } from "./Api/Middlewares/logger.middleware";
import { internalServerErrorHandler } from "./Api/Error-Handler/internal-server-error.handler";
import { notFoundErrorHandler } from "./Api/Error-Handler/not-found-error.handler";
import { NotFoundError } from "./Api/Errors/not-found.error";
import mustacheExpress from "mustache-express";
import { userRouter } from "./Api/Routers/users.router";
import { DatabaseConnection } from "./Core/Database/connection";
import { config } from "dotenv";
import { authRouter } from "./Api/Routers/auth.router";
import cookieParser from 'cookie-parser';
import { seeder } from "./Core/Database/seeder";
import { rateLimit } from 'express-rate-limit';

// classes => PascalCase
// function => camelCase
// variable => camelCase
// constantes => SCREAMING_SNAKE_CASE
// fichiers => kebab | camelCase | Pascal | ...

const PORT = 8081;

async function init() {
    config({
        path: 'development.env'
    });

    await DatabaseConnection.init();
    const databaseInstance = DatabaseConnection.getConnection();


    if (process.env.DB_REFRESH === "true") {
        console.log("Refreshing de la DB ...");

        await databaseInstance.dropDatabase();
        await databaseInstance.synchronize();
        await seeder();
    }else{
        await databaseInstance.synchronize();
    }
    
    const application: Application = express();
    
    application.engine('mustache', mustacheExpress());
    application.set('view engine', 'mustache');
    application.set('views', './Views');
    
    application.use(rateLimit({
        limit: 20,
        windowMs: 10 * 1000
    }))
    application.use(cookieParser());
    application.use(json());
    application.use(loggerMiddleware);
    application.use('/assets', express.static(__dirname + '/assets'));
    application.use('/static', express.static(__dirname + '/uploads'));
    application.use('/sounds', soundRouter);
    application.use('/users', userRouter);
    application.use('/auth', authRouter);
    
    //override le comportement par défaut pour la 404
    application.use((request, response, next) => {
        throw new NotFoundError();
    })
    application.use(notFoundErrorHandler);
    application.use(internalServerErrorHandler);
    
    
    application.listen(PORT, () => {
        console.log(`Prêt et à l\'écoute sur http://localhost:${PORT}`);
    })
}


init();