import { NextFunction, RequestHandler, Response, Request } from "express";
import { getUserById } from "../Database/users";

export function createAuthorizeMiddleWare(roles: string[]): RequestHandler {
    return async (request: Request, response: Response, next: NextFunction) => {
        if (!request.query.userId) {
            return response.status(403).send("Forbidden");
        }
        const user = await getUserById(request.query.userId as string);
        if (!user) {
            return response.status(403).send("Forbidden");
        }
        if (roles.length > 0 && !roles.includes(user.role)) {
            return response.status(403).send("Forbidden");
        }

        next();
    }
}