import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api/app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  getHello(): string {
    return this.appService.getHello();
  }
  @Get(":name")
  getName(@Param("name") name:string): string {
    return "Hello " + name;
  }
}