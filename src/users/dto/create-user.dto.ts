import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  nis: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  isActive: boolean;
}
