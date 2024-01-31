import { DataSource, Equal, In, IsNull, LessThan, Not, Raw } from "typeorm";
import { Game, GameType } from "./models/games";

async function init() {
    const connection = new DataSource({
        type: 'mysql',
        port: 3306,
        host: 'localhost',
        database: 'bot-theorie',
        password: 'bot-theorie',
        username: 'bot-theorie',
        entities: ['src/models/*.ts'],
        logging: ['query']
    });

    await connection.initialize();

    const manager = connection.manager;

    // await connection.dropDatabase();
    await connection.synchronize();

    console.log("Connected");
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();
