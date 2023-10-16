import { ConversationSchema, LoginChatSchema } from './../schema/chat.schema';
import { z } from 'zod';
export type LoginChatDto = z.infer<typeof LoginChatSchema>;
export type ConversationDto = z.infer<typeof ConversationSchema>;

export interface chatInterface {
  joinRoom(data: any, socketId: string): any;
  fetchMessage(data: any): any;
  sendMessage(message: any): any;
  exitRoom(body: any): any;
}
