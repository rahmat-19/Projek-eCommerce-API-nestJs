import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    jurusan: string;

    @Column()
    code: string;
}