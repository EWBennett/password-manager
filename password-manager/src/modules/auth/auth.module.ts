import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './auth.strategy';
import { Password } from 'src/schemas/password.schema';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from 'src/app.module';
import { config } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
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
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [LocalStrategy, JwtModule],
})
export class AuthModule {}
