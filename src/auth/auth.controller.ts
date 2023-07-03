import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { CreateUserDto } from 'src/user/dtos/user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<any> {
    // const returnLoginDto = await this.authService.login(authDto);
    const returnLoginDto = await this.authService.signUp(createUserDto);

    return returnLoginDto;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  async signIn(@Body() authDto: AuthDto): Promise<any> {
    // const returnLoginDto = await this.authService.login(authDto);
    const returnLoginDto = await this.authService.signIn(authDto);

    return returnLoginDto;
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request): Promise<any> {
    // const returnLoginDto = await this.authService.login(loginDto);
    this.authService.logout(req.user['sub']);
    return 'returnLoginDto';
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
