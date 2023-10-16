import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { ChatService } from './chat.service';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationSchema, LoginChatSchema } from './schema/chat.schema';
import { UsePipes } from '@nestjs/common';
import { ConversationDto, LoginChatDto } from './interface/chat.interface';
import { ZodValidationPipe } from './chat.validation';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements NestGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} is connected`);
  }

  async handleDisconnection(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} was disconnected`);
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody(new ZodValidationPipe(LoginChatSchema)) body: LoginChatDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<WsResponse<any>> {
    const roominfo = await this.chatService.joinRoom(body);
    if (roominfo?.code == 200) {
      console.log(`${body.username} joining ${body.room_name} room`);
      this.server.socketsJoin(body.room_name);
      console.log('rooms', socket.rooms);
      this.server
        .to(body.room_name)
        .emit('join_room', `${body.username} has joined the room`);
    }
    return { event: 'join_room', data: roominfo };
  }

  @SubscribeMessage('new_message')
  @UsePipes()
  async handleConversation(
    @MessageBody(new ZodValidationPipe(ConversationSchema))
    body: ConversationDto,
  ): Promise<WsResponse<any>> {
    this.server.socketsJoin(body.room_name);
    const chatMsg = await this.chatService.sendMessage(body);
    this.server.to(body.room_name).emit('conversation', chatMsg);
    return { event: 'new_message', data: chatMsg };
  }

  @SubscribeMessage('exit')
  @UsePipes(new ZodValidationPipe(LoginChatSchema))
  async handleExit(
    @MessageBody() body: LoginChatDto,
  ): Promise<WsResponse<any>> {
    const exit = await this.chatService.exitRoom(body);
    console.log(`${body.username} leaving ${body.room_name} room`);
    this.server.socketsLeave(body.room_name);
    return { event: 'exit', data: exit };
  }
}
