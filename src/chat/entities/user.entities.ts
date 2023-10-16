import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  _id?: string;

  @Prop()
  socket_id?: string;

  @Prop()
  isConnected?: boolean;
}

const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.index({
  username: 'text',
});

export { UserSchema };
