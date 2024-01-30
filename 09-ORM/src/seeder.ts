import type { EntityManager } from "typeorm";
import { Game, GameType } from "./models/games";

export async function seedDatabase(manager: EntityManager) {
    const game = manager.create(
        Game,
        [
            {
                title: 'Heroes of Might and Magic IV',
                genre: [
                    GameType.TURN_BASED,
                    GameType.STRATEGY
                ],
                releaseDate: '2002-03-28',
                note: 84.0
            },
            {
                title: 'Fallout II',
                genre: [
                    GameType.STRATEGY,
                    GameType.RPG,
                    GameType.TURN_BASED
                ],
                releaseDate: '1998-10-29',
                note: 86
            },
            {
                title: 'The Witcher III',
                genre: [
                    GameType.RPG
                ],
                releaseDate: '2015-05-19',
                note: 92
            },
            {
                title: 'Tetris',
                genre: [
                    GameType.STRATEGY
                ],
                releaseDate: '1984-06-06',
                note: 88
            },
            {
                title: 'Counter-Strike 2',
                genre: [
                    GameType.FPS
                ],
                releaseDate: '2023-09-27',
                note: 91
            },
            {
                title: 'GTA VI',
                genre: [
                    GameType.RPG,
                    GameType.ACTION
                ],
                releaseDate: '2025-05-02',
                note: 90
            }
        ]
    );

    await manager.save(game);
}