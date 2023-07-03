import { Role } from 'src/user/enum/roles.enum';

export class AccessTokenPayloadDto {
  id: string;
  email: string;
  role: Role;
  //   typeUser: number;
  constructor(userId: string, email: string, role: Role) {
    this.id = userId;
    this.email = email;
    this.role = role;
  }
}
