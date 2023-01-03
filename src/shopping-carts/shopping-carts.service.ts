import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AddItemToChartDto } from './dto/add-item-to-cart.dto';
import { ShoppingCarts } from './entities/shopping-carts.entity';

@Injectable()
export class ShoppingCartsService {
    constructor(
        @InjectRepository(ShoppingCarts)
        private shoppingCartsRepository: Repository<ShoppingCarts>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){}

    async addItem(addItemToChart: AddItemToChartDto)
    {
        const produk =  await this.productRepository.findOneOrFail({where: {id: addItemToChart.productId}})
        const checkProduk = await this.shoppingCartsRepository.findOne({
            where: {
                product: produk,
            }
        });
        return checkProduk;


        // if (!checkItem) {
        //     const item = new ShoppingCarts();
        //     item.product = await this.productRepository.findOneOrFail({where: {id: addItemToChart.productId}})
        //     item.user = await this.userRepository.findOneOrFail({where: {id: addItemToChart.userId}})
        //     item.qty = addItemToChart.qty

        //     const result = await this.shoppingCartsRepository.insert(item);


        //     return this.shoppingCartsRepository.findOneOrFail({
        //         where: {
        //             id: result.identifiers[0].id,
        //         },
        //         relations: ['user', 'product']
        //     });
        // } else {

        //     await this.shoppingCartsRepository.update(checkItem.id, {qty: checkItem.qty+addItemToChart.qty});
        // }

    }



}
