import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { PasswordCrudDto } from 'src/dto/password-crud.dto';
import { PasswordDto, fromPassword } from 'src/dto/password.dto';
import { UserCrudDto } from 'src/dto/user-crud.dto';
import { UserDto, fromUser } from 'src/dto/user.dto';
import { Password, PasswordDocument } from 'src/schemas/password.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class PasswordService {
  constructor(
    @InjectModel(Password.name) private passwordModel: Model<PasswordDocument>,
  ) {}

  async getAllPasswords(): Promise<PasswordDto[]> {
    const result = await this.passwordModel.find().exec();
    return result.map(fromPassword);
  }

  async getAllPasswordsForUser(userID: string): Promise<PasswordDto[]> {
    const result = await this.passwordModel.find({ userID: userID }).exec();
    return result.map(fromPassword);
  }

  async getOnePassword(passwordID: string): Promise<PasswordDto> {
    const result = await this.passwordModel.findById(passwordID).exec();
    return fromPassword(result);
  }

  async createPassword(createPasswordDto: PasswordCrudDto): Promise<string> {
    const createdPassword = new this.passwordModel(createPasswordDto);
    const result = await createdPassword.save();
    return result._id;
  }

  async editPassword(
    passwordID: string,
    editPasswordDto: PasswordCrudDto,
  ): Promise<void> {
    await this.passwordModel
      .findByIdAndUpdate(
        passwordID,
        { ...editPasswordDto },
        { useFindAndModify: true },
      )
      .exec();
  }

  async deletePassword(passwordID: string): Promise<void> {
    const deletedPassword = this.passwordModel.findById(passwordID);
    await this.passwordModel.deleteOne(deletedPassword).exec();
  }
}
