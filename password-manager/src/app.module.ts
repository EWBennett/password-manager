import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Password, PasswordSchema } from './schemas/password.schema';
import { UserModule } from './modules/user/user.module';
import { PasswordModule } from './modules/password/password.module';
import { AuthModule } from './modules/auth/auth.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    UserModule,
    PasswordModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DATABASE_ADDRESS),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Password.name, schema: PasswordSchema },
    ]),
  ],
  exports: [MongooseModule, UserModule],
})
export class AppModule {}
