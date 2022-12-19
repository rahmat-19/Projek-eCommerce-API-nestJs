import { ApiProperty } from '@nestjs/swagger';

export class UpdateInventoryDto {
    @ApiProperty()
    name?: string

    @ApiProperty()
    jurusan?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    stok?: number

    @ApiProperty()
    visibility?
}