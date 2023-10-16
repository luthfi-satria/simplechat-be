import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatLoginDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async fetchMessage(@Query() query: ChatLoginDto) {
    return await this.chatService.fetchMessage(query);
  }

  @Post()
  async DeleteUser(@Body() body: any) {
    return await this.chatService.exitRoom(body);
  }
}
