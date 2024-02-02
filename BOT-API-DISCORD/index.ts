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
import { initApi } from "./Api";

// classes => PascalCase
// function => camelCase
// variable => camelCase
// constantes => SCREAMING_SNAKE_CASE
// fichiers => kebab | camelCase | Pascal | ...

async function initApplication() {
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

    await initApi();
}


initApplication();