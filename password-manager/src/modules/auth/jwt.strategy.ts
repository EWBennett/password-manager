import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { Role } from 'src/roles';

config();

export const JWT_STRATEGY = 'JWT';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET,
    });
  }

  /**
   * Creates a JWT token for a user
   * @param {AuthTokenPayload} payload
   * @returns The token
   */
  async validate(payload: AuthTokenPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}

export interface AuthTokenPayload {
  sub: string;
  username: string;
  role: Role;
}
