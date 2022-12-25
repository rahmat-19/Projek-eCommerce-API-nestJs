import { Module } from '@nestjs/common';
import { ProduksService } from './produks.service';
import { ProduksController } from './produks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produk } from './entities/produk.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produk, User, Category])],
  providers: [ProduksService],
  controllers: [ProduksController]
})
export class ProduksModule {}
