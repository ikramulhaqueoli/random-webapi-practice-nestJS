import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true })
  senderUsername: string;

  @Prop({ required: true })
  receiverUsername: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Date, default: Date.UTC })
  sentAt: Date;

  @Prop({ required: true, default: false })
  isSeenByReceiver: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
