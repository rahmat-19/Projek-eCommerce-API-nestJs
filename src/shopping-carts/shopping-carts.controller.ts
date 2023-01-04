import { Controller, HttpStatus } from '@nestjs/common';
import { Body, Get, Param, Post, Put, Req } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { number, string } from 'joi';
import { AddItemToChartDto } from './dto/add-item-to-cart.dto';
import { ShoppingCartsService } from './shopping-carts.service';

@Controller('shopping-carts')
export class ShoppingCartsController {
    constructor(private readonly shoppingCartsService:ShoppingCartsService){}

    @Post()
    async create(
        @Body() addItemToChart : AddItemToChartDto
        )
    {
        try{
            return{

                data: await this.shoppingCartsService.addItem(addItemToChart),
                statusCode: HttpStatus.CREATED,
                message: 'success',
            };
        } catch(e){
            console.log((e.code));
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
