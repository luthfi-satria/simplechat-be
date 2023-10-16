import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document, ObjectId } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  room_name: string;

  @Prop()
  users: string;
}

const RoomSchema = SchemaFactory.createForClass(Room);

RoomSchema.index({
  room_name: 'text',
  users: 'text',
});

export { RoomSchema };
