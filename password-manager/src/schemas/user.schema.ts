import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Role, Roles } from 'src/roles';
import { enumValues } from 'src/utils';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, enum: enumValues(Role), default: Role.User })
  role: Role;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  passwordHint: string;

  @Prop({ required: true, default: false })
  hasVerifiedEmail: boolean;

  @Prop()
  secretQuestions: { question: string; answer: string }[];

  @Prop({ required: true, default: 0 })
  failedAttempts: number;

  @Prop()
  lastAttemptDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
