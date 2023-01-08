import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class AddItemToCartDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    qty: number=1

    @ApiProperty()
    @IsNotEmpty()
    productId?: string

    @ApiProperty()
    @IsNotEmpty()   
    userId: string

}