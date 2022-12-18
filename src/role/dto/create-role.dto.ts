import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @ApiProperty({format: 'form-data'})
    name: string
}