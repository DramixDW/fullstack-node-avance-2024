import { NextFunction, RequestHandler, Response, Request } from "express";
import { getUserById } from "../Database/users";
import { verify } from "jsonwebtoken";

export function createAuthorizeMiddleWare(roles: string[]): RequestHandler {
    return async (request: Request, response: Response, next: NextFunction) => {
        const token = request.headers.authorization;

        if (!token) {
            return response.status(401).send("Unauthorized");
        }

        const [, accessToken] = token.split(" ");

        try {
            const accessTokenDecoded = verify(accessToken, process.env.JWT_SECRET!, {
                complete: true
            });

            const user = await getUserById(accessTokenDecoded.payload.sub as string);
        
            if (!user) {
                return response.status(403).send("Forbidden");
            }
            
            if (roles.length > 0 && !roles.includes(user.role)) {
                return response.status(403).send("Forbidden");
            }
        } catch(e) {
            return response.status(401).send("Unauthorized");
        }
        
    

        next();
    }
}