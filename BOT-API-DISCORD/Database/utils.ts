import { readFile, rm, writeFile } from "fs/promises";
import { EntityNotFoundError } from "../Errors/entity-not-found.error";

async function readFileAndParseAsJson(fileName: string) {
    const stringifiedData = await readFile(`./Data/${fileName}.json`, 'utf8');
    return JSON.parse(stringifiedData);
}

async function stringifyJsonAndOverWrite(modelName: string, data: Object[]) {
    const stringified = JSON.stringify(data);
    await writeFile(`./Data/${modelName}.json`, stringified);
}

export async function getAll(modelName: string) {
    return readFileAndParseAsJson(modelName);
}

export async function getById(modelName: string, id: string) {
    const sounds = await readFileAndParseAsJson(modelName);
    const foundEntity = sounds.find((obj: { id: string }) => obj.id == id); 
    if (!foundEntity) {
        throw new EntityNotFoundError();
    }
    return foundEntity;
}

export async function insert(modelName: string, body: Object) {
    const data = await readFileAndParseAsJson(modelName);
    data.push(body);
    await stringifyJsonAndOverWrite(modelName, data);
    return body;
}

export async function replace(modelName: string, id: string, body: Object) {
    const data = await readFileAndParseAsJson(modelName);
    const replaceIndex = data.findIndex((obj: { id: string }) => {
        return obj.id === id;
    });
    data[replaceIndex] = body;
    console.log(data);
    await stringifyJsonAndOverWrite(modelName, data);
    return body;
}

export async function update (modelName: string, id: string, body: Object) {
    const data = await readFileAndParseAsJson(modelName);
    const updateIndex = data.findIndex((obj: { id: string}) => obj.id === id);
    if (updateIndex === -1) {
        throw new EntityNotFoundError();
    }
    data[updateIndex] = { ...data[updateIndex], ...body };
    await stringifyJsonAndOverWrite(modelName, data);
    return data[updateIndex];
}

export async function deleteEntity (modelName: string, id: string) {
    const data = await readFileAndParseAsJson(modelName);
    const toDeleteIndex = data.findIndex((obj: { id: string }) => obj.id === id);
    // le splice retourne ce qui a été supprimé
    const deleted = data.splice(toDeleteIndex, 1);
    await stringifyJsonAndOverWrite(modelName, data);
    // vu qu'il n'y a qu'un élément qui a été supp, on retourne l'élément supprimé 0
    return deleted[0];
}

export async function deleteSound (id: string) {
    const deleted = await deleteEntity('sound', id); // on supprime le son en DB
    // pas oublier uploads/ devant
    const deletedPath = `uploads/${deleted.file}`;
    await rm(deletedPath);
}