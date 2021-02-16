import { User, UserDocument } from 'src/schemas/user.schema';
import { UserBaseDto } from './user-base.dto';

export interface UserDto extends UserBaseDto {
  uid: string;
}

export function fromUser(user: UserDocument): UserDto {
  return {
    uid: user._id,
    username: user.username,
    email: user.email,
  };
}
