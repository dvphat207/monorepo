import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConnectionConfig, DatabaseConfig } from '@/shared/config';
import { DatabaseService, DatabaseModule } from '@/shared/database';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ConnectionConfig, DatabaseConfig],
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true
    }),

    MongooseModule.forRootAsync({
      inject: [DatabaseService],
      imports: [DatabaseModule],
      useFactory: (databaseService: DatabaseService) => databaseService.createMongooseOptions()
    }),

    CommentModule
  ]
})
export class AppModule {}
