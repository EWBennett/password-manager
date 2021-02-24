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

  @Get('users/:userID')
  async getOneUser(
    @Param('userID') userID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.appService.getOneUser(userID);
    response.status(HttpStatus.OK).send(result);
  }

  @Get('passwords')
  async getAllPasswords(@Res() response: Response): Promise<void> {
    const result = await this.appService.getAllPasswords();
    response.status(HttpStatus.OK).send(result);
  }

  @Get('passwords/:userID')
  async getAllPasswordsForUser(
    @Param('userID') userID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.appService.getAllPasswordsForUser(userID);
    response.status(HttpStatus.OK).send(result);
  }

  @Get('passwords/:passwordID')
  async getOnePassword(
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.appService.getOnePassword(passwordID);
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

  @Patch('users/:userID')
  async updateUser(
    @Body() body: UserBaseDto,
    @Param('userID') userID: string,
    @Res() response: Response,
  ) {
    await this.appService.editUser(userID, body);
    response.status(HttpStatus.OK).send();
  }

  @Patch('passwords/:passwordID')
  async updatePassword(
    @Body() body: PasswordBaseDto,
    @Param() passwordID: string,
    @Res() response: Response,
  ) {
    await this.appService.editPassword(passwordID, body);
    response.status(HttpStatus.OK).send();
  }

  @Delete('users/:userID')
  async deleteUser(@Param('userID') userID: string, @Res() response: Response) {
    await this.appService.deleteUser(userID);
    response.status(HttpStatus.OK).send();
  }

  @Delete('passwords/:passwordID')
  async deletePassword(
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ) {
    await this.appService.deletePassword(passwordID);
    response.status(HttpStatus.OK).send();
  }
}
