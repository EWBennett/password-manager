import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExtractJwt } from 'passport-jwt';
import { Role, ROLES_KEY } from 'src/roles';
import { Request } from 'express';
import { AuthTokenPayload } from './jwt.strategy';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const httpctx: HttpArgumentsHost = context.switchToHttp();
    const request: Request = httpctx.getRequest();
    const token: string = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const payload: AuthTokenPayload = this.jwtService.verify(token, {
      ignoreExpiration: true,
    });
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(payload);
    if (!requiredRoles) {
      return true;
    }

    return requiredRoles.some((role) => payload.role === role);
  }
}
