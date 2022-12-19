import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CretaeInventoryDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    // @IsNotEmpty()
    jurusan?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    @IsNotEmpty()
    stok: number

    @ApiProperty()
    @IsNotEmpty()
    visibility
}