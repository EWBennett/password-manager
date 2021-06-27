import {
  Body,
  Controller, Delete, Get, HttpStatus, Param, Patch, Post,
  Request,
  Res, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PasswordBaseDto } from 'src/dto/password-base.dto';
import { Role, Roles } from 'src/roles';
import { JWT_STRATEGY } from '../auth/jwt.strategy';
import { RolesGuard } from '../auth/roles.guard';
import { PasswordService } from './password.service';

@Controller('api/passwords')
@ApiTags('Password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Get('')
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      'The end-point has loaded succesfully and will return all the passwords',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async getAllPasswords(@Res() response: Response): Promise<void> {
    const result = await this.passwordService.getAllPasswords();
    response.status(HttpStatus.OK).send(result);
  }

  @Get('me')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async getAllPasswordsForSelf(
    @Request() request,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.passwordService.getAllPasswordsForUser(
      request.user.userId,
    );
    response.status(HttpStatus.OK).send(result);
  }

  @Get('me/:passwordID')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async getOnePasswordForSelf(
    @Request() request,
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.passwordService.getOnePassword(passwordID);
    if (result.userID == request.user.userId) {
      response.status(HttpStatus.OK).send(result);
    } else {
      response.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Get(':userID')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async getAllPasswordsForUser(
    @Param('userID') userID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.passwordService.getAllPasswordsForUser(userID);
    response.status(HttpStatus.OK).send(result);
  }

  @Post('me')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async createPasswordForSelf(
    @Body() body: PasswordBaseDto,
    @Request() request,
    @Res() response: Response,
  ): Promise<void> {
    body.userID = request.user.userId;
    response
      .status(HttpStatus.CREATED)
      .send(await this.passwordService.createPassword(body));
  }

  @Post('')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async createPassword(
    @Body() body: PasswordBaseDto,
    @Res() response: Response,
  ): Promise<void> {
    response
      .status(HttpStatus.CREATED)
      .send(await this.passwordService.createPassword(body));
  }

  @Get(':passwordID')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async getOnePassword(
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.passwordService.getOnePassword(passwordID);
    response.status(HttpStatus.OK).send(result);
  }

  @Patch('me/:passwordID')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async updatePasswordForSelf(
    @Body() body: PasswordBaseDto,
    @Request() request,
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ) {
    body.userID = request.user.userId;
    await this.passwordService.editPassword(passwordID, body);
    response.status(HttpStatus.OK).send();
  }

  @Patch(':passwordID')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async updatePassword(
    @Body() body: PasswordBaseDto,
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ) {
    await this.passwordService.editPassword(passwordID, body);
    response.status(HttpStatus.OK).send();
  }

  @Delete('me/:passwordID')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async deletePasswordForSelf(
    @Param('passwordID') passwordID: string,
    @Request() request,
    @Res() response: Response,
  ) {
    const result = await this.passwordService.getOnePassword(passwordID);
    if (result.userID == request.user.userId) {
      await this.passwordService.deletePassword(passwordID);
      response.status(HttpStatus.OK).send();
    } else {
      response.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Delete(':passwordID')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async deletePassword(
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ) {
    await this.passwordService.deletePassword(passwordID);
    response.status(HttpStatus.OK).send();
  }
}
