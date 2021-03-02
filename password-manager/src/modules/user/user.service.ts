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
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Password.name) private passwordModel: Model<PasswordDocument>,
  ) {}

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
}
