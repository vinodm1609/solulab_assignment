import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  let Id = '63a93e173c75e4ad92c79adc';

  const category = {
    _id: Id,
    categoryName: 'category Name',
    created_at: '1623925970055',
    updated_at: '1623925970055',
  };

  const categoryTest = [
    {
      _id: Id,
      categoryName: 'category Name',
      created_at: '1623925970055',
      updated_at: '1623925970055',
    },
  ];

  const mokCategory = {
    create: jest.fn().mockImplementation((category) => {
      return {
        ...category,
      };
    }),

    findById: jest.fn((Id: string) => {
      return categoryTest.filter((com) => com._id === Id)[0];
    }),

    all: jest.fn(() => of([category])),

    update: jest.fn().mockImplementation((_id, category) => ({
      _id,
      ...category,
    })),

    delete: jest.fn((Id: string) => {
      return categoryTest.filter((com) => com._id === Id)[0];
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useValue: mokCategory }],
    }).compile();

    controller = app.get<CategoryController>(CategoryController);
  });

  describe('category Controller', () => {
    it('should create a new category', async () => {
      const result = await controller.create(category);
      expect(result).toBeDefined();
    });

    it('should give list of category ', async () => {
      const result = await controller.all(
        {
          categoryName: 'vinod',
        },
        { page: 1 },
      );
      expect(result).toBeDefined();
    });

    it('should find category by id', async () => {
      const result = await controller.fetch(category._id);
      expect(result).toBeDefined();
    });

    it('should update a category', async () => {
      const result = await controller.update(category._id, category);
      expect(result).toBeDefined();
    });

    it('should delete category', async () => {
      const result = await controller.delete(category._id);
      expect(result).toBeDefined();
    });
  });
});
