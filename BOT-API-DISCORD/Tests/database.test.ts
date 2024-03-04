import { config } from "dotenv";
import { DatabaseConnection } from "../Core/Database/connection";
import { getUserById } from "../Core/Database/users";
import { Role, User } from "../Core/Models/users";

async function seedForTesting() {
    const connection = DatabaseConnection.getConnection();

    const userForTest = connection.getRepository(User).create({
        id: 'timmy',
        username: 'Dramix',
        lastName: 'Banane',
        firstName: 'Loutre',
        role: Role.ADMIN,
        password: 'sjflkdjsflkdj'
    });

    await connection.getRepository(User).save(userForTest);
 }

it('fetch users', async () => {
    config({
        path: 'development.env'
    });
    await DatabaseConnection.init();
    await seedForTesting();
    const user = await getUserById('timmy');

    expect(user).toHaveProperty('firstName', 'Loutre');

    await DatabaseConnection.closeConnection();
});