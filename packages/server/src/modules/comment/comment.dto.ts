import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

import { Pagination } from '@/common/interfaces';
import { CommentPojo } from '@/modules/comment/comment.entity';

export class SearchCommentRequest {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  public readonly page: number;

  @Type(() => Number)
  @IsPositive()
  public readonly limit: number;

  @Type(() => Number)
  @IsPositive()
  @IsOptional()
  public readonly postId?: number;

  @IsString()
  @IsOptional()
  public readonly name?: string;

  @IsString()
  @IsOptional()
  public readonly email?: string;

  @IsString()
  @IsOptional()
  public readonly body?: string;
}

export type SearchCommentResponse = Pagination<CommentPojo>;

export interface UploadCommentResponse {
  inserted: number;
  uploaded: number;
}
