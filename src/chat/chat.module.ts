import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './entities/chat.entities';
import { ChatGateway } from './chat.gateway';
import { Room, RoomSchema } from './entities/room.entities';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
  providers: [ChatGateway, ChatService],
  exports: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
