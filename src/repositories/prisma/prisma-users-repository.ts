import { PrismaService } from 'prisma/prisma-service';
import { UsersRepository } from '../users-repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, ReturnUserDto } from 'src/user/dtos/user.dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<any> {
    return await this.prismaService.users.create({
      data: {
        ...createUserDto,
      },
    });
  }
  async getAll(): Promise<ReturnUserDto[]> {
    return await this.prismaService.users.findMany();
  }
  async delete(id: string): Promise<ReturnUserDto> {
    return await this.prismaService.users.delete({ where: { id } });
  }
  async getUserByEmail(email: string): Promise<ReturnUserDto> {
    return await this.prismaService.users.findFirst({ where: { email } });
  }
  async getUserById(id: string): Promise<ReturnUserDto> {
    return await this.prismaService.users.findFirst({ where: { id } });
  }

  async update(id: string, data) {
    return await this.prismaService.users.update({
      where: { id },
      data: { ...data },
    });
  }
}
