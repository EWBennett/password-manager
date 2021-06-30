import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordCrudDto } from 'src/dto/password-crud.dto';
import { fromPassword, PasswordDto } from 'src/dto/password.dto';
import { Password, PasswordDocument } from 'src/schemas/password.schema';
import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';

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
    return await this.convertList(result);
  }

  /**
   * Get all password records for a user, only executable by an admin
   * @param {string} userID The ID of the user to get passwords for
   */
  async getAllPasswordsForUser(userID: string): Promise<PasswordDto[]> {
    const result = await this.passwordModel.find({ userID }).exec();
    return await this.convertList(result);
  }

  /**
   * Get one password, only executable by an admin
   * @param {string} passwordID The ID of the password to get
   */
  async getOnePassword(passwordID: string): Promise<PasswordDto> {
    const result = await this.passwordModel.findById(passwordID).exec();
    const { iv, password: encryptedPassword } = result;
    return fromPassword(result, await this.decrypt(encryptedPassword, iv));
  }

  /**
   * Create a password record and save it to the database
   * @param {PasswordCrudDto} createPasswordDto A DTO of the password to be saved
   */
  async createPassword(createPasswordDto: PasswordCrudDto): Promise<string> {
    const encryptedRecord = {
      ...createPasswordDto,
      ...(await this.encrypt(createPasswordDto.password)),
    };
    const createdPassword = new this.passwordModel(encryptedRecord);
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
    const encryptedRecord: PasswordCrudDto = {
      ...editPasswordDto,
      ...(await this.encrypt(editPasswordDto.password)),
    };
    await this.passwordModel
      .findByIdAndUpdate(
        passwordID,
        { ...encryptedRecord },
        { useFindAndModify: true },
      )
      .exec();
  }

  /**
   * Delete a password record
   * @param {string} passwordID The ID of the password to be deleted
   */
  async deletePassword(passwordID: string): Promise<void> {
    const deletedPassword = this.passwordModel.findById(passwordID);
    await this.passwordModel.deleteOne(deletedPassword).exec();
  }

  /**
   * Loop through all passwords and decrypt, used to get all records
   * @param passwords List of encrypted passwords
   * @returns
   */
  private async convertList(
    passwords: PasswordDocument[],
  ): Promise<PasswordDto[]> {
    return Promise.all(
      passwords.map(
        (password): Promise<PasswordDto> => {
          const { iv, password: encryptedPassword } = password;
          return new Promise((acc, rej) => {
            try {
              this.decrypt(encryptedPassword, iv)
                .then((decryptedPassword) => {
                  acc(fromPassword(password, decryptedPassword));
                })
                .catch((e) => {
                  return rej(e);
                });
            } catch (e) {
              // password is not encrypted
              acc(encryptedPassword);
            }
          }).catch((e) => {
            console.error(e);
          });
        },
      ),
    );
  }

  /**
   * Encrypt a password
   * @param unencryptedPassword Plaintext password to be encrypted
   * @returns Encrypted password and IV
   */
  private async encrypt(unencryptedPassword: string) {
    try {
      const ivBytes = randomBytes(16);
      const key = await this.createKey();
      const cipher = createCipheriv('aes-256-ctr', key, ivBytes);
      const encryptedText = Buffer.concat([
        cipher.update(unencryptedPassword),
        cipher.final(),
      ]);
      const password = encryptedText.toString('base64');
      const iv = ivBytes.toString('base64');
      return { password, iv };
    } catch {
      console.error("Can't encrypt password");
      return { password: unencryptedPassword, iv: null };
    }
  }

  /**
   * Decrypt a password
   * @param encryptedPassword Encrypted password to be decrypted
   * @param ivString Initialisation variable
   * @returns Decrypted password
   */
  private async decrypt(encryptedPassword: string, ivString: string) {
    try {
      if (!ivString) throw 'Not encrypted';
      const iv = Buffer.from(ivString, 'base64');
      const key = await this.createKey();
      const decipher = createDecipheriv('aes-256-ctr', key, iv);
      const passwordBuffer = Buffer.from(encryptedPassword, 'base64');
      const decryptedText = Buffer.concat([
        decipher.update(passwordBuffer),
        decipher.final(),
      ]);
      return decryptedText.toString('utf8');
    } catch (e) {
      console.error("Can't decrypt password " + e);
      return encryptedPassword;
    }
  }

  private async createKey(): Promise<Buffer> {
    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.
    return (await promisify(scrypt)(
      process.env.ENCRYPT_PASSWORD,
      'salt',
      32,
    )) as Buffer;
  }
}
