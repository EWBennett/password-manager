import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  passwordHash: string;

  @Prop()
  passwordSalt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
