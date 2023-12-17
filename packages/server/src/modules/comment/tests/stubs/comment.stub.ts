import { CommentPojo } from '@/modules/comment/comment.entity';

export const createCommentStub = (): CommentPojo => ({
  _id: 1,
  postId: 1,
  name: 'molestias et odio ut commodi omnis ex',
  email: 'Laurie@lincoln.us',
  body: 'perferendis omnis esse\nvoluptate sit mollitia sed perferendis\nnemo nostrum qui\nvel quis nisi doloribus animi odio id quas'
});
