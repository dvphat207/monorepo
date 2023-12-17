import mongoose from 'mongoose';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'comments',
  timestamps: true,
  versionKey: false
})
export class Comment {
  @Prop({ type: Number, required: true })
  _id: number;

  @Prop({ type: Number, required: true })
  postId: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  body: string;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export const CommentDefinition: ModelDefinition = {
  name: Comment.name,
  schema: CommentSchema
};

// export type CommentDoc = Comment & mongoose.Document;
export type CommentDoc = mongoose.Document & Comment;
export type CommentPojo = mongoose.FlattenMaps<Comment>;
