import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
