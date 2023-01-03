import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class AddItemToChartDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    qty: number

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    productId?: string

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string

}