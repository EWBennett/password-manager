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
  UseGuards,
} from '@nestjs/common';
import { UserBaseDto } from 'src/dto/user-base.dto';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY } from '../auth/jwt.strategy';
import { Role, Roles } from 'src/roles';
import { RolesGuard } from '../auth/roles.guard';

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
    @Body() body: UserBaseDto,
    @Res() response: Response,
  ): Promise<void> {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.createUser(body));
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

  @Delete(':userID')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(JWT_STRATEGY), RolesGuard)
  async deleteUser(@Param('userID') userID: string, @Res() response: Response) {
    await this.userService.deleteUser(userID);
    response.status(HttpStatus.OK).send();
  }
}
