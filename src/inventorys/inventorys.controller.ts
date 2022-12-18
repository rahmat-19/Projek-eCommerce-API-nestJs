import { Body, Controller, Delete, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CretaeInventoryDto } from './dto/create-inventorys.dto';
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

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.inventorysService.remove(id);

        return {
            statusCode: HttpStatus.OK,
            message: 'success',
        };
    }
}
