import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CommentService } from '../comment.service';
import { CommentDefinition } from '../comment.entity';
import { CommentRepository } from '../comment.repository';
import { CommentController } from '../comment.controller';
import { SearchCommentResponse, UploadCommentResponse } from '../comment.dto';

import { createCommentStub, createFileStub, createQueryStub } from './stubs';

const fileStub = createFileStub();
const queryStub = createQueryStub();
const commentStubs = [createCommentStub(), createCommentStub()];

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,

        CommentRepository,
        {
          provide: getModelToken(CommentDefinition.name),
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  describe('search', () => {
    it('should call service.search and return the result', async () => {
      // Arrange
      const expectedResult: SearchCommentResponse = {
        page: queryStub.page,
        limit: queryStub.limit,
        data: commentStubs,
        total: commentStubs.length
      };
      jest.spyOn(service, 'search').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.search(queryStub);

      // Assert
      expect(service.search).toHaveBeenCalledWith(queryStub);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('upload', () => {
    it('should call service.upload and return the result', async () => {
      // Arrange
      const expectedResult: UploadCommentResponse = {
        inserted: 500,
        uploaded: 500
      };
      jest.spyOn(service, 'upload').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.upload(fileStub);

      // Assert
      expect(service.upload).toHaveBeenCalledWith(fileStub);
      expect(result).toEqual(expectedResult);
    });
  });
});
