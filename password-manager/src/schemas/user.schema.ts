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

  @Prop()
  passwordHint: string;

  @Prop()
  hasVerifiedEmail: boolean;

  @Prop()
  secretQuestions: { question: string; answer: string }[];

  @Prop()
  failedAttempts: number;

  @Prop()
  lastAttemptDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
