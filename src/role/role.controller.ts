import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto) {

        return {
            data: await this.roleService.create(createRoleDto),
            statusCode: HttpStatus.CREATED,
            massage: 'success'
        };
    }

    @Get()
    async findAll() {
        const [data, count] = await this.roleService.findAll();

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
        @Body() updateRoleDto: CreateRoleDto,
    ) {
        return {
            data: await this.roleService.update(id, updateRoleDto),
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.roleService.remove(id);

        return {
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }
}
