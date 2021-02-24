import { PasswordBaseDto } from './password-base.dto';

export interface PasswordCrudDto extends PasswordBaseDto {
  name?: string;
  URL?: string;
  username?: string;
  notes?: string;
}
