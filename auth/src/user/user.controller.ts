import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, ReturnUserDto } from 'src/user/dtos/user.dto';
import { UserService } from './user.service';
import { Role } from './enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Delete()
  @Roles(Role.Admin)
  async deleteUser(@Body() body: any): Promise<ReturnUserDto> {
    return await this.userService.deleteUser(body.id);
  }

  @Get(':id')
  @Roles(Role.Admin)
  async getUser(@Param() params: any): Promise<ReturnUserDto> {
    return await this.userService.getUserById(params.id);
  }
}
