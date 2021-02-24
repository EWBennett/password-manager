import { ObjectId } from "mongoose";

export interface PasswordBaseDto {
  userID?: string;
  password?: string;
}
