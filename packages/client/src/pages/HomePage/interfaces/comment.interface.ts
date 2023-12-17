import { Pagination } from '@/common/interfaces';

export interface Comment {
  postId: number;
  _id: number;
  name: string;
  email: string;
  body: string;
}

export interface SearchCommentRequest {
  page: number;
  limit: number;
  postId?: number;
  name?: string;
  email?: string;
  body?: string;
}

export type SearchCommentResponse = Pagination<Comment>;

export interface UploadCommentResponse {
  inserted: number;
  uploaded: number;
}

export type CommentTableColumnKey = 'postId' | '_id' | 'name' | 'email' | 'body';
export interface CommentTableColumn {
  id: CommentTableColumnKey;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string | number) => any;
}

export type CommentTableFilterKey = keyof CommentTableFilter;
export interface CommentTableFilter {
  postId?: number;
  name?: string;
  email?: string;
  body?: string;
}
