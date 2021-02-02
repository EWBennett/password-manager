import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User, UserDocument } from './user.schema';

@Controller("api/app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("users")
  async getUsers(): Promise<UserDocument[]> {
    return this.appService.getUsers();
  }
}
