import { z } from 'zod';

export const LoginChatSchema = z
  .object({
    room_name: z.string().min(1),
    username: z.string().min(1),
  })
  .required();

export const ConversationSchema = z
  .object({
    room_name: z.string().min(1),
    username: z.string().min(1),
    message: z.string().min(1),
  })
  .required();
