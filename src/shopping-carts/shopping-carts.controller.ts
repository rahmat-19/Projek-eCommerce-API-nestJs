import { Controller, HttpStatus } from '@nestjs/common';
import { Body, Get, Post } from '@nestjs/common/decorators';
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


}
