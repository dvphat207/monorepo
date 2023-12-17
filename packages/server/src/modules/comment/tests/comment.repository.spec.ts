import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CommentRepository } from '../comment.repository';
import { CommentDefinition, CommentPojo } from '../comment.entity';
import { createCommentStub, createQueryStub } from './stubs';

const commentStubs = [createCommentStub(), createCommentStub()];
const queryStub = createQueryStub();

class InsertedError extends Error {
  insertedDocs: CommentPojo[];

  constructor(message: string, insertedDocs: CommentPojo[]) {
    super(message);
    this.insertedDocs = insertedDocs;
  }
}

describe('CommentRepository', () => {
  let repository: CommentRepository;
  let model: Model<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentRepository,
        {
          provide: getModelToken(CommentDefinition.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
            countDocuments: jest.fn().mockReturnThis(),
            create: jest.fn().mockReturnThis(),
            insertMany: jest.fn().mockReturnThis(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            lean: jest.fn().mockReturnValue(commentStubs)
          }
        }
      ]
    }).compile();

    repository = module.get<CommentRepository>(CommentRepository);
    model = module.get<Model<Comment>>(getModelToken(CommentDefinition.name));
  });

  afterEach(() => jest.clearAllMocks());

  describe('search', () => {
    it('should return an array of comments', async () => {
      // Act
      const result = await repository.search(queryStub);

      // Assert
      expect(model.find).toHaveBeenCalled();
      expect(model.find().sort).toHaveBeenCalledWith('_id');
      expect(model.find().sort().skip).toHaveBeenCalledWith(queryStub.page * queryStub.limit);
      expect(
        model
          .find()
          .sort('_id')
          .skip(queryStub.page * queryStub.limit).limit
      ).toHaveBeenCalledWith(queryStub.limit);
      expect(result).toEqual(commentStubs);
    });
  });

  describe('count', () => {
    it('should return the number of comments', async () => {
      const expectedCount = 5;

      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(expectedCount);

      const result = await repository.count(queryStub);

      expect(result).toEqual(expectedCount);
      expect(model.countDocuments).toHaveBeenCalled();
    });
  });

  describe('createMany', () => {
    it('should create multiple comments', async () => {
      const expectedCreatedCount = commentStubs.length;
      jest.spyOn(model, 'insertMany').mockResolvedValueOnce(commentStubs as any);

      const result = await repository.createMany(commentStubs);

      expect(result).toEqual(expectedCreatedCount);
      expect(model.insertMany).toHaveBeenCalledWith(commentStubs, { ordered: false });
    });
  });

  it('should handle error when inserting documents', async () => {
    const nInsertedBeforeFailure = 1;
    const insertedDocs = commentStubs.slice(0, nInsertedBeforeFailure);
    const error = new InsertedError('Error inserting documents', insertedDocs);

    jest.spyOn(model, 'insertMany').mockRejectedValueOnce(error);

    const result = await repository.createMany(commentStubs);

    expect(result).toEqual(nInsertedBeforeFailure); // Number of inserted documents before the error occurred
    expect(model.insertMany).toHaveBeenCalledWith(commentStubs, { ordered: false });
  });
});
