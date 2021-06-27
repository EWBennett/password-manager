import { Role } from 'src/roles';
import { UserDocument } from 'src/schemas/user.schema';
import { UserBaseDto } from './user-base.dto';

export interface UserDto extends UserBaseDto {
  id: string;
  role: Role;
}

export function fromUser(user: UserDocument): UserDto {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
