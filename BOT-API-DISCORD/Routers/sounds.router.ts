import { NextFunction, Request, Response, Router } from "express";
import { deleteEntity, getAll, getById, insert, replace } from "../Database/utils";
import { createAuthorizeMiddleWare } from "../Middlewares/authorize.middleware";
import { EntityNotFoundError } from "../Errors/entity-not-found.error";
import { notFoundErrorHandler } from "../Error-Handler/not-found-error.handler";

export const soundRouter = Router();

soundRouter.get('/', createAuthorizeMiddleWare([]), async (request, response) => {
    const sounds = await getAll('sounds');
    response.send(sounds);
})

soundRouter.get('/list', async (request, response) => {
    const sounds = await getAll('sounds');
    response.render('sound_list', {
        sounds,
    });
})

soundRouter.get('/:id', createAuthorizeMiddleWare([]), async (request: Request, response: Response, next: NextFunction) => {
    const sound = await getById('sounds', request.params.id);
    if (!sound) {
        return next(new EntityNotFoundError('banane'));
    }
    response.send(sound);
})

soundRouter.post('/', createAuthorizeMiddleWare(["Admin"]), async (request, response) => {
    console.log(request.body);
    response.send(await insert('sounds', request.body));
})

soundRouter.put('/:id', createAuthorizeMiddleWare(["Admin"]), async (request, response) => {
    response.send(await replace('sounds', request.params.id, request.body));
})

soundRouter.delete('/:id', async (request, response) => {
    await deleteEntity('sounds', request.params.id);
    response.status(204).send(null);
})
