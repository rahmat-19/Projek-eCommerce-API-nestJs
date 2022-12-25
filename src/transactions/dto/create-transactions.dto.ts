import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsUUID } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty()
    @IsUUID()
    produkId: string;

    @ApiProperty()
    @IsUUID()
    userId: string;

    @ApiProperty({default: false})
    @IsBoolean()
    paymentStatus: boolean;

    @ApiProperty()
    @IsString()
    deliveryStatus: string;

}