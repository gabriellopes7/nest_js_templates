import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, ReturnUserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: PrismaUsersRepository) {}

  //TODO Criar um DTO para proteger propriedades de usuários para endpoints acessíveis
  async createUser(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userRepository.getUserByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('This email is already being used.');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    createUserDto.password = hash;

    const newUser = await this.userRepository.create(createUserDto);
    return newUser;
  }

  async getAllUsers(): Promise<ReturnUserDto[]> {
    return await this.userRepository.getAll();
  }

  async deleteUser(id: string): Promise<ReturnUserDto> {
    return await this.userRepository.delete(id);
  }

  async getUserByEmail(email: string): Promise<ReturnUserDto | undefined> {
    const user = await this.userRepository
      .getUserByEmail(email)
      .catch(() => undefined);
    if (!user) {
      throw new NotFoundException(`Email: ${email} not found.`);
    }
    return user;
  }
  async getUserById(id: string): Promise<any | undefined> {
    const user = await this.userRepository
      .getUserById(id)
      .catch(() => undefined);
    if (!user) {
      throw new NotFoundException(`User ID: ${id} not found.`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, updateUserDto);
  }
}
