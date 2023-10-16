import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ChatDocuments = Chat & Document;

@Schema()
export class Chat {
  @Prop()
  room_name?: string;

  @Prop()
  username?: string;

  @Prop({
    required: [true, 'Message is Required'],
  })
  message?: string;

  @Prop()
  sent_at?: string;
}

const ChatSchema = SchemaFactory.createForClass(Chat);

ChatSchema.index({
  room_name: 'text',
  username: 'text',
});

export { ChatSchema };
