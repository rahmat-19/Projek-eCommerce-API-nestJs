import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryService } from './category.service';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('create')
    async create(@Body() createCategoryDto: CreateCategoryDto) {
      return {
        data: await this.categoryService.create(createCategoryDto),
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    }

  @Get()
    async findAll() {
      const [data, count] = await this.categoryService.findAll();

      return {
        data,
        count,
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }

  @Get(':category')
    async findOne(@Param('category') category: string) {
      return {
        data: await this.categoryService.findOne(category),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }


  @Put('edit/:id')
    async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return {
      data: await this.categoryService.update(id, updateCategoryDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
