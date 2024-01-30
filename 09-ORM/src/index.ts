import { DataSource, In, IsNull, LessThan, Not, Raw } from "typeorm";
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

    await connection.synchronize();

    const games = await manager.find(Game, {
        where: {
            genre: Raw((columnAlias) => {
                // typeorm n'a pas de support pour la recherche dans des SET, donc on fait à la main
                return `FIND_IN_SET(:value, ${columnAlias} )`;
            }, {
                value: GameType.ACTION
            })
        }
    });

    // - 90 note
    const badGames = await manager.find(Game, {
        where: {
           note: LessThan(90)
        }
    });

    console.log(badGames);

    // pas de prix
    const noPriceGames = await manager.find(Game, {
        where: {
            price: IsNull()
        }
    });

    console.log('Jeux sans prix : ', noPriceGames);

    // tout sauf fallout
    const notFallout = await manager.find(Game, {
        where: {
            title: Not('Fallout II')
        }
    });

    console.log(notFallout);
    

    console.log("Connected");
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();
