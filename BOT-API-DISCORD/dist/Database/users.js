"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.insertUser = exports.getUserById = exports.getAllUsers = void 0;
const entity_not_found_error_1 = require("../Errors/entity-not-found.error");
const connection_1 = require("./connection");
const users_1 = require("../Models/users");
async function getAllUsers() {
    return connection_1.DatabaseConnection.manager.find(users_1.User);
}
exports.getAllUsers = getAllUsers;
async function getUserById(id) {
    const foundEntity = await connection_1.DatabaseConnection.manager.findOne(users_1.User, {
        where: {
            id
        }
    });
    if (!foundEntity) {
        throw new entity_not_found_error_1.EntityNotFoundError();
    }
    return foundEntity;
}
exports.getUserById = getUserById;
async function insertUser(body) {
    const user = connection_1.DatabaseConnection.manager.create(users_1.User, body);
    await connection_1.DatabaseConnection.manager.save(user);
    return user;
}
exports.insertUser = insertUser;
async function updateUser(id, body) {
    const user = await getUserById(id);
    Object.assign(user, body);
    await connection_1.DatabaseConnection.manager.save(user);
    return user;
}
exports.updateUser = updateUser;
async function deleteUser(id) {
    const user = await getUserById(id);
    await connection_1.DatabaseConnection.manager.delete(users_1.User, user);
    return user;
}
exports.deleteUser = deleteUser;
