import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { escapeRegex } from '@/common/utils';
import { AnyObject } from '@/common/interfaces';

import { SearchCommentRequest } from './comment.dto';
import { CommentDefinition, CommentPojo } from './comment.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(CommentDefinition.name)
    private readonly commentModel: Model<Comment>
  ) {}

  private buildFilter(query: SearchCommentRequest): AnyObject {
    const filter: AnyObject = {};

    if (query?.postId) {
      filter.postId = query.postId;
    }

    if (query?.name) {
      filter.name = { $regex: escapeRegex(query.name), $options: 'i' };
    }

    if (query?.body) {
      filter.body = { $regex: escapeRegex(query.body), $options: 'i' };
    }

    if (query?.email) {
      filter.email = { $regex: escapeRegex(query.body), $options: 'i' };
    }

    return filter;
  }

  public async search(query: SearchCommentRequest): Promise<CommentPojo[]> {
    return await this.commentModel
      .find(this.buildFilter(query))
      .sort('_id')
      .skip(query.page * query.limit)
      .limit(query.limit)
      .lean();
  }

  public async count(query: SearchCommentRequest): Promise<number> {
    return await this.commentModel.countDocuments(this.buildFilter(query));
  }

  public async createMany(comments: CommentPojo[]): Promise<number> {
    try {
      /**
       * @see https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/#execution-of-operations
       * If ordered is set to false and an insert fails (eg: duplicated _id), the server continues inserting records
       */
      const insertedDocs = await this.commentModel.insertMany(comments, { ordered: false });
      return insertedDocs.length;
    } catch (error) {
      // Number of inserted documents before an error occurred
      return error.insertedDocs.length;
    }
  }
}
