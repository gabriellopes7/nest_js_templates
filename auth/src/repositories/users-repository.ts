import { CreateUserDto, ReturnUserDto } from 'src/user/dtos/user.dto';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<void>;
  abstract getAll(): Promise<ReturnUserDto[]>;
  abstract delete(id: string): Promise<ReturnUserDto>;
  abstract getUserByEmail(email: string): Promise<ReturnUserDto>;
}
