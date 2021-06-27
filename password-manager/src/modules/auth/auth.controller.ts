import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role, Roles } from 'src/roles';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @Roles(Role.Admin, Role.User)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
