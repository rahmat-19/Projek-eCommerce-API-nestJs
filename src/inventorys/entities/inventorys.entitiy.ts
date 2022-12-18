import { Department } from "src/users/entities/department.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn, } from "typeorm";

export enum Visibilitys {
    PUBLIC = 'public',
    DEPARTEMENT = 'departement',
}

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column({
        default : 1
    })
    stok: number

    @ManyToOne(
        () => {
        return Department;
        },
        (department) => department.code, {nullable: true}
    )
    department: Department;

    @Column({
        type: 'enum',
        enum: Visibilitys
    })
    visibility: Visibilitys


    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp with time zone',
        nullable: true,
    })
    deletedAt: Date;
}