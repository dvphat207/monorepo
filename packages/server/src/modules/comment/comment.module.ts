import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

import { CommentDefinition } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Module({
  imports: [MongooseModule.forFeature([CommentDefinition])],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController]
})
export class CommentModule {}
