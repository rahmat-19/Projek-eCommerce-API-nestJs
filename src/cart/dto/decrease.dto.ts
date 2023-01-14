import { IsNotEmpty, IsOptional } from "class-validator";

export class DecreaseDto {
    @IsNotEmpty()
    id: string;
    
    @IsOptional()
    qty: number=1;
}