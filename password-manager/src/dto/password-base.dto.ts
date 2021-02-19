import { ObjectId } from "mongoose";

export interface PasswordBaseDto {
  uid?: ObjectId;
  password?: string;
}
