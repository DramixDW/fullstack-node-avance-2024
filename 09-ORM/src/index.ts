import { DataSource, Equal, In, IsNull, LessThan, Not, Raw } from "typeorm";
import { Game, GameType } from "./models/games";
import { seedDatabase } from "./seeder";
import { Platform } from "./models/platforms";

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

    await connection.dropDatabase();
    await connection.synchronize();

    await seedDatabase(manager);

    const heroesOfMightAndMagic = await manager.findOneOrFail(Game, {
        where: {
            title: Equal('Heroes Of Might and magic IV')
        },
        // on charge les relations explicitement
        relations: ['editor', 'platforms']
    });

    const XBOX = await manager.findOneOrFail(Platform, {
        where: {
            name: 'XBOX'
        }
    });

    // ajout de la relation aux plate-formes
    heroesOfMightAndMagic.platforms.push(XBOX);

    // suppression de la relation
    heroesOfMightAndMagic.platforms = heroesOfMightAndMagic.platforms.filter((platform) => {
        return platform.name !== "PC master race"
    });

    await manager.save(heroesOfMightAndMagic);

    console.log("Connected");
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();
