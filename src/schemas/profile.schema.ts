import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ type: Date })
  birthday: Date;

  @Prop()
  horoscope?: string;

  @Prop()
  zodiac?: string;

  @Prop()
  height?: number;

  @Prop()
  weight?: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
