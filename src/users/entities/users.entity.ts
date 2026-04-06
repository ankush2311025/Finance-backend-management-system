import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    email : string;

    @Column()
    password : string;

    @Column()
    status : string;

    @ManyToOne(() => Role) // callback function is used to specify the type of the related entity 
    role : Role;
}