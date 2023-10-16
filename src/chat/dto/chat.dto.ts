import { IsNotEmpty, IsString } from 'class-validator';

export class ChatLoginDto {
  @IsNotEmpty()
  @IsString()
  room_name: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}

export class ConversationDto {
  room_name: string;
  username: string;
  message: string;
}
