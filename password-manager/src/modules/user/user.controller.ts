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
import { UserBaseDto } from 'src/dto/user-base.dto';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUsers(@Res() response: Response): Promise<void> {
    const result = await this.userService.getAllUsers();
    response.status(HttpStatus.OK).send(result);
  }

  @Post('')
  async createUser(
    @Body() body: UserBaseDto,
    @Res() response: Response,
  ): Promise<void> {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.createUser(body));
  }

  @Get(':userID')
  async getOneUser(
    @Param('userID') userID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.userService.getOneUser(userID);
    response.status(HttpStatus.OK).send(result);
  }

  @Patch(':userID')
  async updateUser(
    @Body() body: UserBaseDto,
    @Param('userID') userID: string,
    @Res() response: Response,
  ) {
    await this.userService.editUser(userID, body);
    response.status(HttpStatus.OK).send();
  }

  @Delete(':userID')
  async deleteUser(@Param('userID') userID: string, @Res() response: Response) {
    await this.userService.deleteUser(userID);
    response.status(HttpStatus.OK).send();
  }
}
