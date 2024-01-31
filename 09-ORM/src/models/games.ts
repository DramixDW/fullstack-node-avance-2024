import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ValueTransformer } from "typeorm";
import { Editor } from "./editors";

export enum GameType {
    FPS = "FPS",
    ACTION = "Action",
    RPG = "RPG",
    MMO = "MMO",
    HENTAI = "HENTAI",
    PLATFORMER = "PLATFORMER",
    SURVIVAL = "SURVIVAL",
    RTS = "RTS",
    STRATEGY = "STRATEGY",
    TURN_BASED = "TURN_BASED"
}

export class DecimalTransformer implements ValueTransformer {
  to(decimal?: number): number | undefined {
    // on fait rien
    return decimal;
  }

  from(decimal?: string): number | undefined {
    // on le transforme en nombre quand on le recup de la DB
    return decimal ? parseFloat(decimal) : undefined;
  }
}

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    public declare id: number;

    @Column({
        length: 128,
        unique: true
    })
    public declare title: string;

    @Column({
        type: 'decimal',
        precision: 6,
        scale: 2,
        nullable: true,
        transformer: new DecimalTransformer()
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
        scale: 1,
        transformer: new DecimalTransformer()
    })
    public declare note: number;

    // relation one vers Editor. La propriété dans Editor faisant le lien est 'games'
    @ManyToOne(() => Editor, (editor) => editor.games)
    public declare editor: Editor;
}
