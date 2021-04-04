import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { fromUser, UserDto } from 'src/dto/user.dto';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates the user against their password hash
   * @param {string} username The username
   * @param {string} password The password hash
   * @returns The user if validated, otherwise returns null
   */
  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.userservice.getByUsername(username);
    if (await bcrypt.compare(password, user.passwordHash)) {
      const result = fromUser(user);
      return result;
    }
    return null;
  }

  /**
   * Generate a JWT token based on a user object
   * @param {UserDocument} user The user document
   * @returns An object containing the access token
   */
  async login(user: UserDocument) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
