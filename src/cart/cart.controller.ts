import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Request, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Request() req, @Body() createCartDto: CreateCartDto) {
    return{
      data: await this.cartService.create(createCartDto,req.user.id),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Cart>>{
    try{
      return await this.cartService.findAll(query)
    } catch(e){
      console.log(e);
        
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.cartService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return {
      data: await this.cartService.update(updateCartDto, id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.cartService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
