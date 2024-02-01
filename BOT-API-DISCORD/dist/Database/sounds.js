"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceSound = exports.deleteSound = exports.getSoundById = exports.createSound = exports.getAllSounds = void 0;
const promises_1 = require("fs/promises");
const sounds_1 = require("../Models/sounds");
const connection_1 = require("./connection");
const entity_not_found_error_1 = require("../Errors/entity-not-found.error");
async function getAllSounds() {
    return connection_1.DatabaseConnection.manager.find(sounds_1.Sound);
}
exports.getAllSounds = getAllSounds;
async function createSound(obj) {
    const sound = connection_1.DatabaseConnection.manager.create(sounds_1.Sound, obj);
    await connection_1.DatabaseConnection.manager.save(sound);
    return sound;
}
exports.createSound = createSound;
async function getSoundById(id) {
    const sound = await connection_1.DatabaseConnection.manager.findOne(sounds_1.Sound, {
        where: {
            id
        }
    });
    if (!sound) {
        throw new entity_not_found_error_1.EntityNotFoundError();
    }
    return sound;
}
exports.getSoundById = getSoundById;
async function deleteSound(id) {
    const sound = await getSoundById(id);
    await connection_1.DatabaseConnection.manager.delete(sounds_1.Sound, sound);
    await deleteSoundFile(sound.file);
}
exports.deleteSound = deleteSound;
// suppression du FICHIER son
async function deleteSoundFile(file) {
    const path = `uploads/${file}`;
    await (0, promises_1.rm)(path);
}
async function replaceSound(id, body) {
    const sound = await getSoundById(id);
    const originalFile = sound.file;
    Object.assign(sound, body);
    await connection_1.DatabaseConnection.manager.save(sound);
    await deleteSoundFile(originalFile);
}
exports.replaceSound = replaceSound;
