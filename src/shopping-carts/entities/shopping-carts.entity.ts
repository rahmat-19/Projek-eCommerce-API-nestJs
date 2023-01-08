import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Product } from "src/products/entities/product.entity";


@Entity()

export class ShoppingCarts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    createdBy: string;

    @Column()
    userId: string;

    @ManyToOne(
        () => {return Product},
        (product) => {return product.id},
    )
    product: Product

    @Column({
        default: 1
    })
    qty: number
}