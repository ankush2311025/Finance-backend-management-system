import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/users.entity";

export enum RecordType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}

@Entity()
export class Record {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    amount : number;

    @Column({
    type : 'enum',
    enum : RecordType,
    })
    type : RecordType;

    @Column()
    category : string;

    @Column()
    date : Date;

    @Column()
    notes : string;

    @ManyToOne(() => User)
    user : User;
    
}
