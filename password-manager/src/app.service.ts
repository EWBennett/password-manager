import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserBaseDto } from './dto/user-base.dto';
import { UserCrudDto } from './dto/user-crud.dto';
import { fromUser, UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
//import { Password, PasswordDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAllUsers(): Promise<UserDto[]> {
    const result = await this.userModel.find().exec();
    return result.map(fromUser);
  }

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
}
