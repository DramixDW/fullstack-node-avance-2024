import { Raw, LessThan, IsNull, Not, Equal, EntityManager } from "typeorm";
import { Game, GameType } from "./models/games";

export async function queryTheorie(manager: EntityManager) {
    const games = await manager.find(Game, {
        where: {
            genre: Raw(
                (columnAlias) => {
                    // typeorm n'a pas de support pour la recherche dans des SET, donc on fait à la main
                    return `FIND_IN_SET(:value, ${columnAlias} )`;
                },
                {
                    value: GameType.ACTION,
                },
            ),
        },
    });

    // - 90 note
    const badGames = await manager.find(Game, {
        where: {
            note: LessThan(90),
        },
    });

    console.log(badGames);

    // pas de prix
    const noPriceGames = await manager.find(Game, {
        where: {
            price: IsNull(),
        },
    });

    console.log("Jeux sans prix : ", noPriceGames);

    // tout sauf fallout
    const notFallout = await manager.find(Game, {
        where: {
            title: Not("Fallout II"),
        },
    });

    console.log(notFallout);

    const heroesOfMightAndMagic = await manager.findOne(Game, {
        where: {
            title: Equal("heroes of might and magic IV"),
        },
    });

    console.log(heroesOfMightAndMagic);

    // utile lors des paginations, renvoie le nombre total d'éléments matchés en 2e élément du tableau et en 1er le nombre d'éléments récupérés
    const boomerGames = await manager.findAndCount(Game, {
        where: {
            releaseDate: LessThan(new Date("2000-01-01")),
        },
        // après le premier élément
        skip: 1,
        // prends en 1 !
        take: 1,
    });

    console.log("boomer games", boomerGames);

    // modification avec un save
    const tetris = await manager.findOneOrFail(Game, {
        where: {
            title: Equal("Tetris"),
        },
    });

    tetris.note = 5;

    await manager.save(tetris);

    // UPDATE EN SQL DIRECTEMENT avec un query builder
    const updateQuery = await manager
        .createQueryBuilder()
        .update(Game)
        .set({
            note: 5,
        })
        .where({
            title: Equal("Tetris"),
        })
        .execute();

    // EN SQL PUR
    // await manager.query("UPDATE games SET title='tetrix'");
}
