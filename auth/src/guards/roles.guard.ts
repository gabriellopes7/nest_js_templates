import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginUserDto } from 'src/auth/dtos/logins.dto';
import { ROLES_KEY } from 'src/decorators/roles.decorators';
import { Role } from 'src/user/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { authorization } = context.switchToHttp().getRequest().headers;
    const loginPayload: ReturnLoginUserDto | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayload) return false;
    return requiredRoles.some((role) => role === loginPayload.role);
  }
}
