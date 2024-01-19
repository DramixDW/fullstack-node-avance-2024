import { Router } from "express";
import { getAll, getById, insert, replace } from "../Database/utils";
import { createAuthorizeMiddleWare } from "../Middlewares/authorize.middleware";

export const soundRouter = Router();

soundRouter.get('/', createAuthorizeMiddleWare([]), async (request, response) => {
    const sounds = await getAll('sounds');
    response.send(sounds);
})

soundRouter.get('/:id', createAuthorizeMiddleWare([]), async (request, response) => {
    const sounds = await getById('sounds', request.params.id);
    response.send(sounds);
})

soundRouter.post('/', createAuthorizeMiddleWare(["Admin"]), async (request, response) => {
    response.send(await insert('sounds', request.body));
})

soundRouter.put('/:id', createAuthorizeMiddleWare(["Admin"]), async (request, response) => {
    response.send(await replace('sounds', request.params.id, request.body));
})