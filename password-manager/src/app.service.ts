import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { PasswordDto } from './dto/password.dto';
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

  /* async getOneUser(uid: string): Promise<UserDto> {
    const result = await this.userModel.findById(uid).exec();
    return result;
  } */

  async createUser(createUserDto: UserCrudDto): Promise<string> {
    const createdUser = new this.userModel(createUserDto);
    const result = await createdUser.save();
    return result._id;
  }

  async editUser(uid: string, editUserDto: UserCrudDto): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(uid, { ...editUserDto }, { useFindAndModify: true })
      .exec();
  }

  async deleteUser(uid: string): Promise<void> {
    const deletedUser = this.userModel.findById(uid);
    await this.userModel.deleteOne(deletedUser).exec();
  }

  async createPassword(createPasswordDto: PasswordCrudDto): Promise<string> {
    const createdPassword = new this.passwordModel(createPasswordDto);
    const result = await createdPassword.save();
    return result.userID;
  }

  async editPassword(
    uid: string,
    editPasswordDto: PasswordCrudDto,
  ): Promise<void> {
    await this.passwordModel
      .findByIdAndUpdate(
        uid,
        { ...editPasswordDto },
        { useFindAndModify: true },
      )
      .exec();
  }

  async deletePassword(uid: string): Promise<void> {
    const deletedUser = this.userModel.findById(uid);
    await this.userModel.deleteOne(deletedUser).exec();
  }
}
