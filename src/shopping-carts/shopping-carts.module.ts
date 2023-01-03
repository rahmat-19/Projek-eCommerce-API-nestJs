import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { ShoppingCarts } from './entities/shopping-carts.entity';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ShoppingCartsService } from './shopping-carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCarts, User, Product])],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService]
})
export class ShoppingCartsModule {}
