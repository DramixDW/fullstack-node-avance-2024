import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    ADMIN = "Admin",
    USER = "User"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public declare id: string;

    @Column({
        length: 32
    })
    public declare firstName: string;

    @Column({
        length: 32
    })
    public declare lastName: string;

    @Column({
        type: 'enum',
        enum: Object.values(Role)
    })
    public declare role: Role;
}