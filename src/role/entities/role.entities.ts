import { User } from "src/users/entities/user.entity";
import { OneToOne, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, OneToMany } from "typeorm";

@Entity()
export class Role{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @OneToMany(() => User, (user) => user.role)
    users: User[]

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