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

  /**
   * Get all password records in the databse, only executable by an admin
   */
  async getAllPasswords(): Promise<PasswordDto[]> {
    const result = await this.passwordModel.find().exec();
    return result.map(fromPassword);
  }

  /**
   * Get all password records for a user, only executable by an admin
   * @param {string} userID The ID of the user to get passwords for
   */
  async getAllPasswordsForUser(userID: string): Promise<PasswordDto[]> {
    const result = await this.passwordModel.find({ userID: userID }).exec();
    return result.map(fromPassword);
  }

  /**
   * Get one password, only executable by an admin
   * @param {string} passwordID The ID of the password to get
   */
  async getOnePassword(passwordID: string): Promise<PasswordDto> {
    const result = await this.passwordModel.findById(passwordID).exec();
    return fromPassword(result);
  }

  /**
   * Create a password record and save it to the database
   * @param {PasswordCrudDto} createPasswordDto A DTO of the password to be saved
   */
  async createPassword(createPasswordDto: PasswordCrudDto): Promise<string> {
    const createdPassword = new this.passwordModel(createPasswordDto);
    const result = await createdPassword.save();
    return result._id;
  }

  /**
   * Edit a password record, only excutable by an admin
   * @param {string} passwordID The ID of the password to edit
   * @param {PasswordCrudDto} editPasswordDto A DTO of the new updated password
   */
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

  /**
   * Delete a password record, only executable by an admin
   * @param {string} passwordID The ID of the password to be deleted
   */
  async deletePassword(passwordID: string): Promise<void> {
    const deletedPassword = this.passwordModel.findById(passwordID);
    await this.passwordModel.deleteOne(deletedPassword).exec();
  }
}
