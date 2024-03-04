import { config } from "dotenv";
import { DatabaseConnection } from "../Core/Database/connection";
import { getUserById } from "../Core/Database/users";

it('fetch users', async () => {
    config({
        path: 'development.env'
    });
    await DatabaseConnection.init();
    const user = await getUserById('56221d00-49b7-4f59-8f53-6d037154f5d4');

    expect(user).toHaveProperty('firstName', 'Dramix');

    await DatabaseConnection.closeConnection();
});