import { Produk } from "src/produks/entities/produk.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transactions{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: false
    })
    paymentStatus: boolean;

    @Column()
    deliveryStatus: string;

    @Column({nullable: true})
    status: string;

    @Column()
    total: number

    @ManyToOne(()=> User, user => user.id, {onDelete: "CASCADE"})
    user: User

    @ManyToOne(()=> Produk, produk => produk.id)
    produk: Produk;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'time with time zone',
        nullable: true
    })
    deletedAt: Date;
}