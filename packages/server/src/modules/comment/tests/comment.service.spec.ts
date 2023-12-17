import { Test, TestingModule } from '@nestjs/testing';

import { CommentService } from '../comment.service';
import { CommentRepository } from '../comment.repository';
import { createFileStub, createCommentStub } from './stubs';

const fileStub = createFileStub();
const commentStubs = [createCommentStub(), createCommentStub()];

jest.mock('csvtojson', () =>
  jest.fn(() => ({
    on: jest.fn(),
    fromString: jest.fn().mockImplementation(() => {
      return commentStubs;
    })
  }))
);

describe('CommentService', () => {
  let service: CommentService;
  let repository: CommentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useValue: {
            search: jest.fn(),
            count: jest.fn(),
            createMany: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<CommentService>(CommentService);
    repository = module.get<CommentRepository>(CommentRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('search', () => {
    it('should return search results with pagination information', async () => {
      const query = { page: 0, limit: 10 };
      const total = commentStubs.length;

      jest.spyOn(repository, 'search').mockResolvedValueOnce(commentStubs);
      jest.spyOn(repository, 'count').mockResolvedValueOnce(total);

      const result = await service.search(query);

      expect(repository.search).toHaveBeenCalledWith(query);
      expect(repository.count).toHaveBeenCalledWith(query);
      expect(result).toEqual({
        total,
        data: commentStubs,
        page: query.page,
        limit: query.limit
      });
    });
  });

  describe('upload', () => {
    it('should upload comments from a CSV file', async () => {
      const uploaded = commentStubs.length;
      const inserted = commentStubs.length;

      jest.spyOn(repository, 'createMany').mockResolvedValueOnce(inserted);

      const result = await service.upload(fileStub);

      expect(repository.createMany).toHaveBeenCalled();
      expect(result).toEqual({ inserted, uploaded });
    });
  });
});
