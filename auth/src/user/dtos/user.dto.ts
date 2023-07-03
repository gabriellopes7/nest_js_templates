import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enum/roles.enum';

export interface ReturnUserDto {
  id: string;
  email: string;
  password: string;
  role: Role;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  role: Role;
}
