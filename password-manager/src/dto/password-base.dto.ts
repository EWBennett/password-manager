import { ObjectId } from "mongoose";

export interface PasswordBaseDto {
  uid?: string;
  password?: string;
}
