"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundErrorHandler = void 0;
const entity_not_found_error_1 = require("../Errors/entity-not-found.error");
const not_found_error_1 = require("../Errors/not-found.error");
function notFoundErrorHandler(error, request, response, next) {
    response.status(404);
    if (error instanceof entity_not_found_error_1.EntityNotFoundError) {
        response.send('404 Entity Not Found');
    }
    if (error instanceof not_found_error_1.NotFoundError) {
        response.send('404 Not found');
    }
}
exports.notFoundErrorHandler = notFoundErrorHandler;
