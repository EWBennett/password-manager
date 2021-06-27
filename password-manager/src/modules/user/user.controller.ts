import {
  Body,
  Controller, Delete, Get, HttpStatus, Param, Patch, Post,
  Request,
  Res, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserBaseDto } from 'src/dto/user-base.dto';
import { UserCrudDto } from 'src/dto/user-crud.dto';
import { Role, Roles } from 'src/roles';
import { JWT_STRATEGY } from '../auth/jwt.strategy';
import { RolesGuard } from '../auth/roles.guard';
import { UserService } from './user.service';

@Controller('api/users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async getAllUsers(@Res() response: Response): Promise<void> {
    const result = await this.userService.getAllUsers();
    response.status(HttpStatus.OK).send(result);
  }

  @Post('')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async createUser(
    @Body() body: UserCrudDto,
    @Res() response: Response,
  ): Promise<void> {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.createUser(body));
  }

  @Post('signup')
  async signUp(
    @Body() body: UserCrudDto,
    @Res() response: Response,
  ): Promise<void> {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.createUser(body));
  }

  @Get('me')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async getSelf(@Request() request, @Res() response: Response): Promise<void> {
    const result = await this.userService.getOneUser(request.user.userId);
    response.status(HttpStatus.OK).send(result);
  }

  @Get(':userID')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async getOneUser(
    @Param('userID') userID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.userService.getOneUser(userID);
    response.status(HttpStatus.OK).send(result);
  }

  @Patch('me')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async updateSelf(
    @Body() body: UserBaseDto,
    @Request() request,
    @Res() response: Response,
  ) {
    await this.userService.editUser(request.user.userId, body);
    response.status(HttpStatus.OK).send();
  }

  @Patch(':userID')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async updateUser(
    @Body() body: UserBaseDto,
    @Param('userID') userID: string,
    @Res() response: Response,
  ) {
    await this.userService.editUser(userID, body);
    response.status(HttpStatus.OK).send();
  }

  @Delete('me')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async deleteSelf(@Request() request, @Res() response: Response) {
    await this.userService.deleteUser(request.user.userId);
    response.status(HttpStatus.OK).send();
  }

  @Delete(':userID')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async deleteUser(@Param('userID') userID: string, @Res() response: Response) {
    await this.userService.deleteUser(userID);
    response.status(HttpStatus.OK).send();
  }
}
