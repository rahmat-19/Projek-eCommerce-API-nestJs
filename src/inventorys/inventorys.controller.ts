import { Body, Controller, Delete, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CretaeInventoryDto } from './dto/create-inventorys.dto';
import { UpdateInventoryDto } from './dto/update-inventorys.dto';
import { InventorysService } from './inventorys.service';

@Controller('inventorys')
export class InventorysController {
    constructor (private readonly inventorysService: InventorysService) {}

    @Post()
    async create(@Body() createInventoryDto: CretaeInventoryDto) {
        return {
            data: await this.inventorysService.create(createInventoryDto),
            statusCode: HttpStatus.CREATED,
            message: 'success',
        };
    }

    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateInventoryDto: UpdateInventoryDto,
    ) {
        return {
            data: await this.inventorysService.update(id, updateInventoryDto),
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.inventorysService.remove(id);

        return {
            statusCode: HttpStatus.OK,
            message: 'success',
        };
    }

}
