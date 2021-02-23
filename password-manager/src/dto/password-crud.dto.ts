import { PasswordBaseDto } from './password-base.dto';

export interface PasswordCrudDto extends PasswordBaseDto {
  URL?: string;
  username?: string;
  notes?: string;
}
