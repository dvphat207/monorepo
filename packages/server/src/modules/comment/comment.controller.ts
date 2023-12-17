import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';

import { CommentService } from './comment.service';
import { SearchCommentRequest, SearchCommentResponse, UploadCommentResponse } from './comment.dto';

@Controller('comments')
@UsePipes(new ValidationPipe({ transform: true }))
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Get()
  public async search(@Query() query: SearchCommentRequest): Promise<SearchCommentResponse> {
    return this.service.search(query);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async upload(@UploadedFile() file: Express.Multer.File): Promise<UploadCommentResponse> {
    return this.service.upload(file);
  }
}
