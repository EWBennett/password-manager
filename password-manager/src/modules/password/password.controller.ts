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
import { PasswordService } from './password.service';
import { Response, Request } from 'express';
import { PasswordBaseDto } from 'src/dto/password-base.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  async getAllPasswords(@Res() response: Response): Promise<void> {
    const result = await this.passwordService.getAllPasswords();
    response.status(HttpStatus.OK).send(result);
  }

  @Get(':userID')
  async getAllPasswordsForUser(
    @Param('userID') userID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.passwordService.getAllPasswordsForUser(userID);
    response.status(HttpStatus.OK).send(result);
  }

  @Post('')
  async createPassword(
    @Body() body: PasswordBaseDto,
    @Res() response: Response,
  ): Promise<void> {
    response
      .status(HttpStatus.CREATED)
      .send(await this.passwordService.createPassword(body));
  }

  @Get(':passwordID')
  async getOnePassword(
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.passwordService.getOnePassword(passwordID);
    response.status(HttpStatus.OK).send(result);
  }

  @Patch(':passwordID')
  async updatePassword(
    @Body() body: PasswordBaseDto,
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ) {
    await this.passwordService.editPassword(passwordID, body);
    response.status(HttpStatus.OK).send();
  }

  @Delete(':passwordID')
  async deletePassword(
    @Param('passwordID') passwordID: string,
    @Res() response: Response,
  ) {
    await this.passwordService.deletePassword(passwordID);
    response.status(HttpStatus.OK).send();
  }
}
