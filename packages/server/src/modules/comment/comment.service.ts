import * as csvToJson from 'csvtojson';
import { Injectable } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { SearchCommentRequest, SearchCommentResponse, UploadCommentResponse } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async search(query: SearchCommentRequest): Promise<SearchCommentResponse> {
    const [comments, total] = await Promise.all([
      this.commentRepository.search(query),
      this.commentRepository.count(query)
    ]);

    return {
      total,
      data: comments,
      page: query.page,
      limit: query.limit
    };
  }

  public async upload(file: Express.Multer.File): Promise<UploadCommentResponse> {
    const comments = await csvToJson().fromString(file.buffer.toString());
    for (const comment of comments) {
      comment._id = comment.id;
      delete comment.id;
    }

    const inserted = await this.commentRepository.createMany(comments);
    return { inserted, uploaded: comments.length };
  }
}
