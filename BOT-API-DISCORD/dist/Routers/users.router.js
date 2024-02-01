"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const users_1 = require("../Database/users");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', async (request, response) => {
    const allUsers = await (0, users_1.getAllUsers)();
    response.send(allUsers);
});
exports.userRouter.get('/list', async (request, response) => {
    const users = await (0, users_1.getAllUsers)();
    response.render("user_list", {
        users,
        isCurrentRole: () => function (placeholder, render) {
            const [currentRole, testedRole] = render(placeholder).trim().split(" ");
            if (currentRole === testedRole) {
                return "disabled";
            }
            return "";
        }
    });
});
exports.userRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await (0, users_1.getUserById)(request.params.id);
        response.send(user);
    }
    catch (err) {
        next(err);
    }
});
exports.userRouter.post('/', async (request, response) => {
    response.send(await (0, users_1.insertUser)(request.body));
});
exports.userRouter.patch('/:id', async (request, response, next) => {
    try {
        const user = await (0, users_1.updateUser)(request.params.id, request.body);
        response.send(user);
    }
    catch (err) {
        next(err);
    }
});
exports.userRouter.delete('/:id', async (request, response) => {
    await (0, users_1.deleteUser)(request.params.id);
    response.status(204).send(null);
});
