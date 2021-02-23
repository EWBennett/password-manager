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
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Response } from 'express';
import { UserBaseDto } from './dto/user-base.dto';
import { PasswordBaseDto } from './dto/password-base.dto';

@Controller('api/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getAllUsers(@Res() response: Response): Promise<void> {
    const result = await this.appService.getAllUsers();
    response.status(HttpStatus.OK).send(result);
  }

  @Get('users/:uid')
  async getOneUser(
    @Param('uid') uid: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.appService.getOneUser(uid);
    response.status(HttpStatus.OK).send(result);
  }

  @Get('passwords')
  async getAllPasswords(@Res() response: Response): Promise<void> {
    const result = await this.appService.getAllPasswords();
    response.status(HttpStatus.OK).send(result);
  }

  @Get('passwords/:uid')
  async getAllPasswordsForUser(
    @Param('uid') uid: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.appService.getAllPasswordsForUser(uid);
    response.status(HttpStatus.OK).send(result);
  }

  @Get('passwords/:uid/:name')
  async getPasswordsForUser(
    @Param('uid') uid: string,
    @Param('name') name: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.appService.getPasswordsForUser(uid, name);
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

  @Post('passwords')
  async createPassword(
    @Body() body: PasswordBaseDto,
    @Res() response: Response,
  ): Promise<void> {
    response
      .status(HttpStatus.CREATED)
      .send(await this.appService.createPassword(body));
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

  @Patch('passwords/:uid')
  async updatePassword(
    @Body() body: PasswordBaseDto,
    @Param('uid') uid: string,
    @Res() response: Response,
  ) {
    await this.appService.editPassword(uid, body);
    response.status(HttpStatus.OK).send();
  }

  @Delete('users/:uid')
  async deleteUser(
    @Body() body: UserBaseDto,
    @Param('uid') uid: string,
    @Res() response: Response,
  ) {
    await this.appService.deleteUser(uid);
    response.status(HttpStatus.OK).send();
  }
}
