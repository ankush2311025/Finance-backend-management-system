import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum RoleType {
    ADMIN = 'ADMIN',
    VIEWER = 'VIEWER',
    ANALYST = 'ANALYST',     
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column({
        type : 'enum',
        enum : RoleType,
        default : RoleType.VIEWER,
    })
    name : RoleType;
}