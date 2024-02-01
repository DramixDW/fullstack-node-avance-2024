import { rm } from "fs/promises";
import { NotFoundError } from "../Errors/not-found.error";
import { Sound } from "../Models/sounds";
import { DatabaseConnection } from "./connection";
import { EntityNotFoundError } from "../Errors/entity-not-found.error";

export async function getAllSounds () {
    return DatabaseConnection.manager.find(Sound);
}

export async function createSound(obj: Object) {
    const sound = DatabaseConnection.manager.create(Sound, obj);
    await DatabaseConnection.manager.save(sound);
    return sound;
}

export async function getSoundById(id: string) {
    const sound = await DatabaseConnection.manager.findOne(Sound, {
        where: {
            id
        }
    });

    if (!sound) {
        throw new EntityNotFoundError();
    }

    return sound;
}

export async function deleteSound (id: string) {
    const sound = await DatabaseConnection.manager.findOneBy(Sound, {
        id
    });

    if (!sound) {
        throw new NotFoundError();
    }

    await DatabaseConnection.manager.delete(Sound, sound);
    await deleteSoundFile(sound.file);
}

// suppression du FICHIER son
async function deleteSoundFile(file: string) {
    const path = `uploads/${file}`;
    await rm(path);
}

export async function replaceSound(id: string, body: Object) {
    const sound = await getSoundById(id);
    const originalFile = sound.file;
    Object.assign(sound, body);

    await DatabaseConnection.manager.save(sound);

    await deleteSoundFile(originalFile);
}



