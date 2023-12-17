import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { DATABASE_CONFIG_TOKEN, IDatabaseConfig } from '../config';

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  private readonly uri: string;
  private readonly config: IDatabaseConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<IDatabaseConfig>(DATABASE_CONFIG_TOKEN);
    this.uri = `mongodb://${this.config.username}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.dbName}`;
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.uri,
      authSource: this.config.authSource,
      autoIndex: true,
      autoCreate: true,
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    };
  }
}
