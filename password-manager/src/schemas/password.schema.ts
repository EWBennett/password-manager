import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PasswordDocument = Password & Document;

@Schema()
export class Password {
  @Prop({ type: 'ObjectId' })
  userID: string;

  @Prop()
  password: string;

  @Prop()
  iv: string;

  @Prop()
  name: string;

  @Prop()
  URL: string;

  @Prop()
  username: string;

  @Prop()
  notes: string;
}

export const PasswordSchema = SchemaFactory.createForClass(Password);
