import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { User } from './user.schema';

export type PasswordDocument = Password & Document;

@Schema()
export class Password {
  @Prop({ type: 'ObjectId' })
  userID: ObjectId;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  URL: string;

  @Prop()
  username: string;

  @Prop()
  Notes: string;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);
