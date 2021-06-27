import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
