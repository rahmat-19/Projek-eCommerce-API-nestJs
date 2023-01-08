import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ShoppingCarts } from './entities/shopping-carts.entity';
import { ProductsService } from 'src/products/products.service';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';

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

    async addItem(addItemToCart: AddItemToCartDto) {
        const product = await this.productRepository.findOne({
            where: {
                id: addItemToCart.productId
            }
        })
        const checkProductExistOnCart = await this.shoppingCartsRepository.findOne({
            where: [
                {
                    product: {
                        id: product.id
                    },
                    userId: addItemToCart.userId
                }
            ]
        });

        if (!product) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Product Not Found',
              },
              HttpStatus.NOT_FOUND,
            );
          }      

        if (checkProductExistOnCart) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: 'Product already in cart'
                },
                HttpStatus.BAD_REQUEST
            )
        }

        const cart = new ShoppingCarts()
        cart.createdBy = await (await this.userRepository.findOne({where: {id: addItemToCart.userId}})).email
        cart.userId = addItemToCart.userId
        cart.product = product
        cart.qty = addItemToCart.qty        

        const result = await this.shoppingCartsRepository.insert(cart)        

        return await this.shoppingCartsRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id,
            }
        })

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
