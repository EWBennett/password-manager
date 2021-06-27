import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserCrudDto } from 'src/dto/user-crud.dto';
import { fromUser, UserDto } from 'src/dto/user.dto';
import { Password, PasswordDocument } from 'src/schemas/password.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Password.name) private passwordModel: Model<PasswordDocument>,
  ) {}

  /**
   * Get all users in the database, only executable by an admin
   */
  async getAllUsers(): Promise<UserDto[]> {
    const result = await this.userModel.find().exec();
    return result.map(fromUser);
  }

  /**
   * Get one user, only executable by an admin
   * @param {string} userID The ID of the user to find
   */
  async getOneUser(userID: string): Promise<UserDto> {
    const result = await this.userModel.findById(userID).exec();
    return fromUser(result);
  }

  /**
   * Get a user by username, only executable by an admin
   * @param {string} username The username of user to find
   */
  async getByUsername(username: string): Promise<UserDocument> {
    const result = await this.userModel.findOne({ username }).exec();
    return result;
  }

  /**
   * Create a new user and save it to the database
   * @param {UserCrudDto} createUserDto A DTO of the new user to be saved
   */
  async createUser(createUserDto: UserCrudDto): Promise<string> {
    const createdUser = new this.userModel(createUserDto);
    const result = await createdUser.save();
    return result._id;
  }

  /**
   * Update a user, only executable by an admin
   * @param {string} userID The ID of the user to change
   * @param {UserCrudDto} editUserDto A DTO of the new updated user
   */
  async editUser(userID: string, editUserDto: UserCrudDto): Promise<void> {
    const passwordSalt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(editUserDto.password, passwordSalt);
    await this.userModel
      .findByIdAndUpdate(
        userID,
        { ...editUserDto, passwordHash },
        { useFindAndModify: true },
      )
      .exec();
  }

  /**
   * Delete a user, only executable by an admin
   * @param {string} userID The ID of the user to be deleted
   */
  async deleteUser(userID: string): Promise<void> {
    const deletedUser = this.userModel.findById(userID);
    await this.userModel.deleteOne(deletedUser).exec();
  }
}
