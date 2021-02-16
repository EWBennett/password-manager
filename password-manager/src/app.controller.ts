import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Response } from 'express';
import { UserBaseDto } from './dto/user-base.dto';

@Controller('api/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers(@Res() response: Response): Promise<void> {
    const result = await this.appService.getAllUsers();
    response.status(HttpStatus.OK).send(result);
  }

  @Post('users')
  async createUser(
    @Body() body: UserBaseDto,
    @Res() response: Response,
  ): Promise<void> {
    response
      .status(HttpStatus.CREATED)
      .send(await this.appService.createUser(body));
  }

  @Patch('users/:uid')
  async updateUser(
    @Body() body: UserBaseDto,
    @Param('uid') uid: string,
    @Res() response: Response,
  ) {
    await this.appService.editUser(uid, body);
    response.status(HttpStatus.OK).send();
  }
}
