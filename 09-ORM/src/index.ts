import { DataSource } from "typeorm";
import { Game, GameType } from "./models/games";

async function init() {
    const connection = new DataSource({
        type: 'mysql',
        port: 3306,
        host: 'localhost',
        database: 'bot-theorie',
        password: 'bot-theorie',
        username: 'bot-theorie',
        entities: ['src/models/*.ts']
    });

    await connection.initialize();

    const manager = connection.manager;

    await connection.synchronize();

    // const game = manager.create(
    //     Game,
    //     {
    //         title: 'Heroes of Might and Magic IV',
    //         genre: [
    //             GameType.TURN_BASED,
    //             GameType.STRATEGY
    //         ],
    //         releaseDate: '2002-03-28',
    //         note: 84.0
    //     }
    // );

    // await manager.save(game);

    console.log("Connected");
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();
