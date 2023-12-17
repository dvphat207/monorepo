import { SearchCommentRequest } from '@/modules/comment/comment.dto';

export const createQueryStub = (): SearchCommentRequest => ({
  page: 0,
  limit: 20,
  postId: 1,
  name: 'name',
  body: 'body',
  email: 'email'
});
