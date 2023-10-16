import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleFactoryOptions {
    const dbconfig = {
      uri: process.env.DB_HOST,
      dbName: process.env.DB_NAME,
    };
    return dbconfig;
  }
}
