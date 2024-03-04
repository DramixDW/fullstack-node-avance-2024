import { config } from "dotenv";
import { DatabaseConnection } from "../Core/Database/connection";
import { getUserById } from "../Core/Database/users";
import { Role, User } from "../Core/Models/users";
import { EntityNotFoundError } from "../Api/Errors/entity-not-found.error";

async function seedForTesting() {
    const connection = DatabaseConnection.getConnection();
    // TRUNCATE TABLE 
    await connection.dropDatabase();
    await connection.synchronize();
    
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

beforeEach(async () => {
    config({
        path: 'test.env'
    });
    await DatabaseConnection.init();
    await seedForTesting();
});

it('fetch users', async () => {
    const user = await getUserById('timmy');
    expect(user).toHaveProperty('firstName', 'Loutre');
});

it('throws an EntityNotFoundError when no User is found', async () => {
    await expect(() => getUserById('does-not-exists')).rejects.toThrow(EntityNotFoundError);
});

afterEach(async () => {
    await DatabaseConnection.closeConnection();
});