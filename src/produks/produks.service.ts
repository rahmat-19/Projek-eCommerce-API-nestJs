import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { Category } from './entities/category.entity';
import { Produk } from './entities/produk.entity';

@Injectable()
export class ProduksService {
    constructor (
        @InjectRepository(Produk)
        private produkRepository: Repository<Produk>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){}

    async create(createProdukDto: CreateProdukDto) {
        const produk = new Produk()

        produk.name = createProdukDto.name
        produk.description = createProdukDto.description
        produk.price = createProdukDto.price
        produk.stok = createProdukDto.stok
        produk.image = createProdukDto.image
        produk.user = await this.userRepository.findOne({where: {id: createProdukDto.userId}});
        produk.category = await this.categoryRepository.findOne({where: {id: createProdukDto.categoryId}});

        const result = await this.produkRepository.insert(produk)

        return this.produkRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id,
            },
        });
    }

      async findAll() {
        return await this.produkRepository.findAndCount();
      }

      async findOne(id: string) {
        try {
          return await this.produkRepository.findOneOrFail({
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
      }

      async update(id: string, updateProdukDto: UpdateProdukDto) {
        try {
          await this.produkRepository.findOneOrFail({
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

        const produk = new Produk()
        produk.name = updateProdukDto.name
        produk.price = updateProdukDto.price
        produk.description = updateProdukDto.description
        produk.image = updateProdukDto.image
        produk.stok = updateProdukDto.stok
        produk.category = await this.categoryRepository.findOne({where: {id: updateProdukDto.categoryId}});

        await this.produkRepository.update(id, produk);
      }

      async remove(id: string) {
        try {
          await this.produkRepository.findOneOrFail({
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

        await this.produkRepository.delete(id);
      }


}
