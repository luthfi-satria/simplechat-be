import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocuments } from './entities/chat.entities';
import { chatInterface } from './interface/chat.interface';
import { Room, RoomDocument } from './entities/room.entities';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService implements chatInterface {
  constructor(
    @InjectModel(Room.name)
    private readonly roomRepo: Model<RoomDocument>,
    @InjectModel(Chat.name)
    private readonly chatRepo: Model<ChatDocuments>,
  ) {}

  async joinRoom(body: any) {
    try {
      const room = await this.roomRepo.findOne({
        room_name: body.room_name,
        users: body.username,
      });

      if (!room) {
        const insertData: Partial<Room> = {
          room_name: body.room_name,
          users: body.username,
        };
        const query = await new this.roomRepo(insertData).save();
        return {
          code: HttpStatus.OK,
          message: 'User available',
          data: query,
        };
      } else {
        throw new WsException('User already taken');
      }
    } catch (error) {
      Logger.log('[ERROR] LoginChat => ', error);
      throw error;
    }
  }

  async sendMessage(body: any) {
    try {
      const chat: Partial<ChatDocuments> = {
        ...body,
        sent_at: new Date().toISOString(),
      };

      return new this.chatRepo(chat)
        .save()
        .then((e) => {
          return e;
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      Logger.log('[ERROR] SendMessage => ', error);
      throw error;
    }
  }

  async fetchMessage(body: any) {
    try {
      const list = await this.chatRepo.find({
        room_name: body.room_name,
      });
      return list;
    } catch (error) {
      Logger.log('[ERROR] => message Detail', error);
    }
  }

  async exitRoom(body: any) {
    try {
      console.log(body);
      const query = await this.roomRepo
        .findOneAndDelete({
          room_name: body.room_name,
          users: body.username,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log('ERROR', err);
          throw err;
        });
      return query;
    } catch (error) {
      Logger.log('[ERROR] Logout chat =>', error);
      throw error;
    }
  }
}
