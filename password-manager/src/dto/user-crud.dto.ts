import { UserBaseDto } from './user-base.dto';

export interface UserCrudDto extends UserBaseDto {
  password?: string;
}
