import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AddItemToChartDto } from './dto/add-item-to-cart.dto';
import { ShoppingCarts } from './entities/shopping-carts.entity';
import { ProductsService } from 'src/products/products.service';

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
        const checkProductExistOnCart = await this.shoppingCartsRepository.findOne({
            where:
                {
                    product: {
                        id: addItemToChart.productId
                    },
                }
        });


        if (!checkProductExistOnCart) {
            const item = new ShoppingCarts();
            item.product = await this.productRepository.findOneOrFail({where: {id: addItemToChart.productId}})
            item.user = await this.userRepository.findOneOrFail({where: {id: addItemToChart.userId}})
            item.qty = addItemToChart.qty


            const result = await this.shoppingCartsRepository.insert(addItemToChart);


            return this.shoppingCartsRepository.findOneOrFail({
                where: {
                    id: result.identifiers[0].id,
                },
                relations: ['user', 'product']
            });
        } else {

            await this.shoppingCartsRepository.update(checkProductExistOnCart.id, {qty: checkProductExistOnCart.qty+addItemToChart.qty});

        }
    }

    async updateQty(id: string, qty: number) {
        try {
            await this.shoppingCartsRepository.findOneOrFail({
                where: {
                    id,
                },
            });
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: 'Data not found',
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else {
                throw e;
            }
        }

        await this.shoppingCartsRepository.update(id, {qty: qty});


    }

    async findAll() {
        return await this.shoppingCartsRepository.findAndCount();
    }


}
