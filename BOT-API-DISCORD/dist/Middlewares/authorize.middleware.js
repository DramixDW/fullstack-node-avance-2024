"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorizeMiddleWare = void 0;
const users_1 = require("../Database/users");
function createAuthorizeMiddleWare(roles) {
    return async (request, response, next) => {
        if (!request.query.userId) {
            return response.status(403).send("Forbidden");
        }
        const user = await (0, users_1.getUserById)(request.query.userId);
        if (!user) {
            return response.status(403).send("Forbidden");
        }
        if (roles.length > 0 && !roles.includes(user.role)) {
            return response.status(403).send("Forbidden");
        }
        next();
    };
}
exports.createAuthorizeMiddleWare = createAuthorizeMiddleWare;
