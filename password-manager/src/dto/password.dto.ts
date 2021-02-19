import { Password, PasswordDocument } from 'src/schemas/password.schema';
import { PasswordBaseDto } from './password-base.dto';

export interface PasswordDto extends PasswordBaseDto {
  name?: string;
  URL?: string;
  username?: string;
  notes?: string;
}

export function fromPassword(password: PasswordDocument): PasswordDto {
  return {
    uid: password.userID,
    name: password.name,
    password: password.password,
    URL: password.URL,
    username: password.username,
    notes: password.notes,
  };
}
