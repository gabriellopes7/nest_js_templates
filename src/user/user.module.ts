import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'prisma/prisma-service';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, PrismaUsersRepository],
  exports: [UserService, PrismaService, PrismaUsersRepository],
})
export class UserModule {}
