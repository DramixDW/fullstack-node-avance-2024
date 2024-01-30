import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum GameType {
    FPS = "FPS",
    RPG = "RPG",
    MMO = "MMO",
    HENTAI = "HENTAI",
    PLATFORMER = "PLATFORMER",
    SURVIVAL = "SURVIVAL",
    RTS = "RTS",
    STRATEGY = "STRATEGY",
    TURN_BASED = "TURN_BASED"
}

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    public declare id: number;

    @Column({
        length: 128
    })
    public declare title: string;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2,
        nullable: true
    })
    public declare price?: number;

    @Column({
        type: 'date'
    })
    public declare releaseDate: Date;

    @Column({
        type: 'set',
        enum: Object.values(GameType)
    })
    public declare genre: GameType[];

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 1
    })
    public declare note: number;
}
