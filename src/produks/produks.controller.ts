import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { ProduksService } from './produks.service';

@Controller('produks')
export class ProduksController {
    constructor(private readonly produksService : ProduksService){}
    @Post()
    async create(@Body() createProdukDto : CreateProdukDto)
    {
        try{
            return{
                data: await this.produksService.create(createProdukDto),
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
