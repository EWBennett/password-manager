import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Password, PasswordSchema } from './schemas/password.schema';
import { UserModule } from './modules/user/user.module';
import { PasswordModule } from './modules/password/password.module';

@Module({
  imports: [
    UserModule,
    PasswordModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/password-db'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Password.name, schema: PasswordSchema },
    ]),
  ],
  exports: [
    MongooseModule
  ]
})
export class AppModule {}
