"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const sounds_router_1 = require("./Routers/sounds.router");
const logger_middleware_1 = require("./Middlewares/logger.middleware");
const internal_server_error_handler_1 = require("./Error-Handler/internal-server-error.handler");
const not_found_error_handler_1 = require("./Error-Handler/not-found-error.handler");
const not_found_error_1 = require("./Errors/not-found.error");
const mustache_express_1 = __importDefault(require("mustache-express"));
const users_router_1 = require("./Routers/users.router");
const connection_1 = require("./Database/connection");
// classes => PascalCase
// function => camelCase
// variable => camelCase
// constantes => SCREAMING_SNAKE_CASE
// fichiers => kebab | camelCase | Pascal | ...
const PORT = 8081;
async function init() {
    await connection_1.DatabaseConnection.init();
    const databaseInstance = connection_1.DatabaseConnection.getConnection();
    await databaseInstance.synchronize();
    // await seedUsers(connection.manager);
    const application = (0, express_2.default)();
    application.engine('mustache', (0, mustache_express_1.default)());
    application.set('view engine', 'mustache');
    application.set('views', './Views');
    application.use((0, express_1.json)());
    application.use(logger_middleware_1.loggerMiddleware);
    application.use('/static', express_2.default.static(__dirname + '/uploads'));
    application.use('/sounds', sounds_router_1.soundRouter);
    application.use('/users', users_router_1.userRouter);
    //override le comportement par défaut pour la 404
    application.use((request, response, next) => {
        throw new not_found_error_1.NotFoundError();
    });
    application.use(not_found_error_handler_1.notFoundErrorHandler);
    application.use(internal_server_error_handler_1.internalServerErrorHandler);
    application.listen(PORT, () => {
        console.log(`Prêt et à l\'écoute sur http://localhost:${PORT}`);
    });
}
init();
