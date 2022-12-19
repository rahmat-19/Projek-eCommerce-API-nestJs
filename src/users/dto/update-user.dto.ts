import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsOptional()
    firstName?: string;

    @ApiProperty()
    @IsOptional()
    lastName?: string;

    @ApiProperty()
    @IsOptional()
    password?: string;

    @ApiProperty()
    @IsOptional()
    jurusan?: string;

    @ApiProperty()
    @IsOptional()
    roles?: string;

    @ApiProperty()
    @IsOptional()
    isActive?: boolean;
}
