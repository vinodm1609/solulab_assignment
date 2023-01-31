import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

describe('CategoryService', () => {
  let service: CategoryService;
  let Id = '63a93e173c75e4ad92c79adc';

  const categoryTest = [
    {
      _id: Id,
      categoryName: 'category Name',
      created_at: '1623925970055',
      updated_at: '1623925970055',
    },
  ];

  const mockCategoryService = {
    create: jest.fn().mockImplementation((Category) => {
      return {
        ...Category,
      };
    }),

    save: jest
      .fn()
      .mockImplementation((Category) =>
        Promise.resolve({ _id: Date.now(), ...Category }),
      ),

    all: jest.fn(() => of([categoryTest])),

    findById: jest.fn((Id: string) => {
      return categoryTest.filter((com) => com._id === Id)[0];
    }),

    update: jest.fn().mockImplementation((_id, Category) => ({
      _id,
      ...Category,
    })),

    delete: jest.fn((Id: string) => {
      return categoryTest.filter((com) => com._id === Id)[0];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken(Category.name),
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    service = module.get(getModelToken(Category.name));
  });

  describe('Category services', () => {
    it('should create a new Category record and return that', async () => {
      const dto = {
        categoryName: 'Category Name',
      };
      const result = await service.create(dto);
      expect(result).toBeDefined();
      expect(mockCategoryService.create);
    });

    it('should give list of workShop ', async () => {
      const result = await service.all(
        {
          categoryName: 'vinod',
        },
        { page: 1 },
      );
      expect(result).toBeDefined();
      expect(mockCategoryService.all);
    });

    it('should find Category by id', async () => {
      expect(await service.findById(Id)).toMatchObject(
        categoryTest.filter((obj) => obj._id === Id)[0],
      );
      expect(mockCategoryService.findById);
    });

    it('should update a Category', async () => {
      const dto = {
        categoryName: 'Category Name',
      };
      expect(await service.update(Id, dto)).toEqual({
        _id: Id,
        ...dto,
      });
      expect(mockCategoryService.update);
    });

    it('should delete a Category', async () => {
      const delReturn = await service.delete(Id);
      expect(typeof delReturn);
      expect(delReturn);
    });
  });
});
