import { EntityManager } from "typeorm";
import { Role, User } from "../Models/users";

export async function seedUsers(manager: EntityManager) {
    const users = manager.create(User, [{
        firstName: 'Dramix',
        lastName: 'Otter',
        role: Role.ADMIN
    }, {
        firstName: 'Seb',
        lastName: 'Goat',
        role: Role.USER
    }]);

    await manager.save(users);
}