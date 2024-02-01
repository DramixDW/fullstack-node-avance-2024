"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const promises_1 = require("fs/promises");
function getUserIdOrDefault(request) {
    if (request.query.userId) {
        return request.query.userId;
    }
    return "anonymous";
}
async function loggerMiddleware(request, response, next) {
    const today = new Date();
    const uploadPath = `./Logs/${today.toDateString()}.log`;
    const logContent = `${today.getHours()}-${today.getMinutes()} : ${request.method} ${request.path} ${getUserIdOrDefault(request)}\n`;
    await (0, promises_1.appendFile)(uploadPath, logContent);
    next();
}
exports.loggerMiddleware = loggerMiddleware;
