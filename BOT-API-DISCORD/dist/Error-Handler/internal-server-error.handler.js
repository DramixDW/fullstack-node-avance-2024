"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServerErrorHandler = void 0;
function internalServerErrorHandler(error, request, response, next) {
    response.status(500);
    response.send(`500 Internal Server Error`);
}
exports.internalServerErrorHandler = internalServerErrorHandler;
