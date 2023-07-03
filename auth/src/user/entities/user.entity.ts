import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../enum/roles.enum';

export class User {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: Role;
}
