import { Router } from "express";

// Créer un router
export const userRouter = Router();

userRouter.get('/', (request, response) => {
    response.send({
        users: [
            {
                firstName: 'Romain',
                lastName: 'Verliefden',
            }
        ]
    });
})

// /!\ L'ordre des routes est très important !
userRouter.get('/banane', (request, response) => {
    response.send('j\'envoie des bananes');
})

userRouter.post('/', (request, response) => {
    response.send(request.body);
})

userRouter.get('/:id', (request, response) => {
    console.log(request.params);
    response.send(request.params);
})