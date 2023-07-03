import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/user/enum/roles.enum';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class ReturnLoginUserDto {
  id: string;
  email: string;
  role: Role;
  constructor(id: string, email: string, role: Role) {
    this.id = id;
    this.email = email;
    this.role = role;
  }
}

export class ReturnLoginDto {
  id: string;
  email: string;
  role: Role;
  accessToken: string;
}
