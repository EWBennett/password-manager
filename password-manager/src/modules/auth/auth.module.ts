import { forwardRef, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { AppModule } from 'src/app.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth.strategy';
import { JwtStrategy } from './jwt.strategy';

config();

@Global()
@Module({
  imports: [
    forwardRef(() => AppModule),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [LocalStrategy, JwtModule],
})
export class AuthModule {}
