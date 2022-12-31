import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { ProductsService } from './products.service';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/helpers/image-storage';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
    constructor(private readonly produksService : ProductsService){}

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName
        }),
        fileFilter: imageFileFilter
    }))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createProdukDto : CreateProdukDto
        )
    {
        try{
            return{

                data: await this.produksService.create(createProdukDto, file.filename),
                statusCode: HttpStatus.CREATED,
                message: 'success',
            };
        } catch(e){
            console.log((e.code));
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return {
            data: await this.produksService.findOne(id),
            statusCode: HttpStatus.OK,
            message: 'success',
        };
    }

    @Get()
    async findAll() {
        const [data, count] = await this.produksService.findAll();

        return {
            data,
            count,
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProdukDto: UpdateProdukDto,
    ) {
        return {
            data: await this.produksService.update(id, updateProdukDto),
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.produksService.remove(id);

        return {
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }



}
