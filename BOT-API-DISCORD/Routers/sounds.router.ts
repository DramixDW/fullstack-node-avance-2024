import { Router } from "express";
import { getAll, getById, insert, replace } from "../Database/utils";

export const soundRouter = Router();

soundRouter.get('/', async (request, response) => {
    const sounds = await getAll('sounds');
    response.send(sounds);
})

soundRouter.get('/:id', async (request, response) => {
    const sounds = await getById('sounds', request.params.id);
    response.send(sounds);
})

soundRouter.post('/', async (request, response) => {
    response.send(await insert('sounds', request.body));
})

soundRouter.put('/:id', async (request, response) => {
    response.send(await replace('sounds', request.params.id, request.body));
})