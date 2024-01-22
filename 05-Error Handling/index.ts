import banane, { NextFunction, Request, Response } from 'express';
const banana = banane();

class ErrorHandler {
    // Un error handler est une middleware qui prend  4 arguments plutôt que 3
    // Error, Request, Response et Next
    static NotFoundError(error: Error, request: Request, response: Response, next: NextFunction) {
        if (error instanceof BananError) {
            response.redirect('https://perdu.com');
        }
    }
}


class BananError extends Error {};

banana.get('/', (request, response) => {
   throw new BananError("Z'ai glizé zef !"); 
})

// l'ordre est important
banana.use(ErrorHandler.NotFoundError)
banana.listen(8001, () => {
    console.log('Tu pousses la banane un peu trop loin :smirk:');
});
