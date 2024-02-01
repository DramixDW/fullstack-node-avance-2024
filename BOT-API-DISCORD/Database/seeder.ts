import { EntityManager } from "typeorm";
import { Role, User } from "../Models/users";
import { Category } from "../Models/categories";
import { DatabaseConnection } from "./connection";

export async function seeder() {
    const manager = DatabaseConnection.manager;

    const users = manager.create(User, [{
        firstName: 'Dramix',
        lastName: 'Otter',
        role: Role.ADMIN
    }, {
        firstName: 'Seb',
        lastName: 'Goat',
        role: Role.USER
    }]);

    const categories = manager.create(Category, [
        {
            name: 'Troll'
        },
        {
            name: 'Pet'
        },
        {
            name: 'Animaux'
        },
        {
            name: 'Meme'
        },
        {
            name: 'Anime'
        },
        {
            name: 'Movie'
        },
        {
            name: 'NSFW'
        }
    ]);

    await manager.save(categories);
    await manager.save(users);
}