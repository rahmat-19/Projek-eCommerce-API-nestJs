import { IsNotEmpty, IsOptional } from "class-validator";

export class IncreaseDto {
    @IsNotEmpty()
    id: string;
    
    @IsOptional()
    qty: number=1;
}