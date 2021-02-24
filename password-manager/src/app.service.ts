import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { fromPassword, PasswordDto } from './dto/password.dto';
import { UserBaseDto } from './dto/user-base.dto';
import { UserCrudDto } from './dto/user-crud.dto';
import { fromUser, UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Password, PasswordDocument } from './schemas/password.schema';
import { PasswordCrudDto } from './dto/password-crud.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Password.name) private passwordModel: Model<PasswordDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAllUsers(): Promise<UserDto[]> {
    const result = await this.userModel.find().exec();
    return result.map(fromUser);
  }

  async getOneUser(userID: string): Promise<UserDto> {
    const result = await this.userModel.findById(userID).exec();
    return fromUser(result);
  }

  async createUser(createUserDto: UserCrudDto): Promise<string> {
    const createdUser = new this.userModel(createUserDto);
    const result = await createdUser.save();
    return result._id;
  }

  async editUser(userID: string, editUserDto: UserCrudDto): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(userID, { ...editUserDto }, { useFindAndModify: true })
      .exec();
  }

  async deleteUser(userID: string): Promise<void> {
    const deletedUser = this.userModel.findById(userID);
    await this.userModel.deleteOne(deletedUser).exec();
  }

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
    await this.userModel
      .findByIdAndUpdate(
        passwordID,
        { ...editPasswordDto },
        { useFindAndModify: true },
      )
      .exec();
  }

  async deletePassword(passwordID: string): Promise<void> {
    const deletedPassword = this.userModel.findById(passwordID);
    await this.passwordModel.deleteOne(deletedPassword).exec();
  }
}
