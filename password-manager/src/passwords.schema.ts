import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type PasswordDocument = Password & Document;

@Schema()
export class Password {

    @Prop()
    userID: ObjectId;

    @Prop()
    password: string;

    @Prop()
    website: string;
}

export const UserSchema = SchemaFactory.createForClass(Password);