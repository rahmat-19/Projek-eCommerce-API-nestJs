import { HttpException, HttpStatus, Injectable, NotFoundException, RequestMethod } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){}

    async create(createCategoryDto: CreateCategoryDto){

      // const category = new Category()
      // category.name = createCategoryDto.name
      const result = await this.categoryRepository.insert(createCategoryDto)


        return this.categoryRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id,
            },
        });
    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: string){
      try {
        return await this.categoryRepository.findOneOrFail({
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

    async update(id: string, updateCategoryDto: UpdateCategoryDto){
        try {
            await this.categoryRepository.findOneOrFail({
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
          await this.categoryRepository.update(id, updateCategoryDto);

    }


    async remove(id: string){
        const category = await this.findOne(id);
        return this.categoryRepository.remove(category);
    }
}
