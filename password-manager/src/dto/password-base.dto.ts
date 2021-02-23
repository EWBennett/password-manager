import { ObjectId } from "mongoose";

export interface PasswordBaseDto {
  uid?: string;
  name?: string;
  password?: string;
}
