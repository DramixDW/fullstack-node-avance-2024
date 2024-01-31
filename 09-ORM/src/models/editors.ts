import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./games";

@Entity()
export class Editor {
    @PrimaryGeneratedColumn()
    public declare id: number;

    @Column({
        unique: true
    })
    public declare name: string;

    @Column({
        length: 2
    })
    public declare countryCode: string;

    // Il y a une relation many vers Game, et la relation inverse est l'éditeur dans la classe Game.
    @OneToMany(() => Game, (game) => game.editor)
    public declare games: Game[];
}