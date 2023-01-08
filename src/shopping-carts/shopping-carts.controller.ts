import { Controller, HttpStatus } from '@nestjs/common';
import { Body, Get, Param, Post, Put, Req } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { number, string } from 'joi';
import { AddItemToCartDto } from './dto/add-item-to-cart.dto';
import { ShoppingCartsService } from './shopping-carts.service';

@Controller('cart')
export class ShoppingCartsController {
    constructor(private readonly shoppingCartsService:ShoppingCartsService){}

    @Post()
    async create(@Body() addItemToCart : AddItemToCartDto) {
        try{
            return{
                data: await this.shoppingCartsService.addItem(addItemToCart),
                statusCode: HttpStatus.CREATED,
                message: 'success',
            };
        } catch(e){
        }
    }


    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body
    ) {

        return {
            data: await this.shoppingCartsService.updateQty(id, body.qty),
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }

    @Get()
    async findAll() {
        const [data, count] = await this.shoppingCartsService.findAll();

        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }



}
