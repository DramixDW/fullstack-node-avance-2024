import type { EntityManager } from "typeorm";
import { Game, GameType } from "./models/games";
import { Platform } from "./models/platforms";
import { Editor } from "./models/editors";

export async function seedDatabase(manager: EntityManager) {
    const [
        PCMasterRace,
        Playstation,
        XBOX,
        Gameboy
    ] = manager.create(
        Platform,
        [
            {
                name: 'PC master race'
            },
            {
                name: 'PlayStation'
            },
            {
                name: 'XBOX'
            },
            {
                name: 'Gameboy'
            }
        ]
    );

    await manager.save([
        PCMasterRace,
        Playstation,
        XBOX,
        Gameboy
    ]);

    const [
        ,
        BlackIsle,
        CdProjekt,
        Rockstar,
        ThreeDO,
        Nintendo,
        Valve
    ] = manager.create(
        Editor,
        [
            {
                name: 'Microsoft',
                countryCode: 'US'
            },
            {
                name: 'Black Isle Studio',
                countryCode: 'US'
            },
            {
                name: 'CD Projekt',
                countryCode: 'PL'
            },
            {
                name: 'Rockstar Games',
                countryCode: 'PL'
            },
            {
                name: '3dO',
                countryCode: 'US'
            },
            {
                name: 'Nintendo',
                countryCode: 'JP'
            },
            {
                name: 'Valve Software',
                countryCode: 'US'
            }
        ]
    );

    await manager.save([
        BlackIsle,
        CdProjekt,
        Rockstar,
        ThreeDO,
        Nintendo,
        Valve
    ]);

    const games = manager.create(
        Game,
        [
            {
                title: 'Heroes of Might and Magic IV',
                genre: [
                    GameType.TURN_BASED,
                    GameType.STRATEGY
                ],
                releaseDate: '2002-03-28',
                note: 84.0,
                platforms: [
                    PCMasterRace
                ],
                editor: ThreeDO
            },
            {
                title: 'Fallout II',
                genre: [
                    GameType.STRATEGY,
                    GameType.RPG,
                    GameType.TURN_BASED
                ],
                platforms: [
                    PCMasterRace
                ],
                releaseDate: '1998-10-29',
                note: 86,
                editor: BlackIsle
            },
            {
                title: 'The Witcher III',
                genre: [
                    GameType.RPG
                ],
                platforms: [
                    PCMasterRace,
                    XBOX
                ],
                releaseDate: '2015-05-19',
                note: 92,
                editor: CdProjekt
            },
            {
                title: 'Tetris',
                genre: [
                    GameType.STRATEGY
                ],
                releaseDate: '1984-06-06',
                note: 88,
                platforms: [
                    Gameboy
                ],
                editor: Nintendo
            },
            {
                title: 'Counter-Strike 2',
                genre: [
                    GameType.FPS
                ],
                releaseDate: '2023-09-27',
                note: 91,
                platforms: [
                    PCMasterRace
                ],
                editor: Valve
            },
            {
                title: 'GTA VI',
                genre: [
                    GameType.RPG,
                    GameType.ACTION
                ],
                platforms: [
                    PCMasterRace,
                    Playstation,
                    XBOX
                ],
                releaseDate: '2025-05-02',
                note: 90,
                editor: Rockstar
            }
        ]
    );

    await manager.save(
        games
    );
}