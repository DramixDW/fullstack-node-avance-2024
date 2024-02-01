"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = void 0;
const users_1 = require("../Models/users");
async function seedUsers(manager) {
    const users = manager.create(users_1.User, [{
            firstName: 'Dramix',
            lastName: 'Otter',
            role: users_1.Role.ADMIN
        }, {
            firstName: 'Seb',
            lastName: 'Goat',
            role: users_1.Role.USER
        }]);
    await manager.save(users);
}
exports.seedUsers = seedUsers;
