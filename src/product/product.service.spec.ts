import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.schema';

describe('ProductService', () => {
  let service: ProductService;
  let Id = '63a93e173c75e4ad92c79adc';
  let categoryId = '63a13f90a0a42611f950b45b';

  const productTest = [
    {
      _id: Id,
      productName: 'Product Name',
      qtyPerUnit: '10',
      unitPrice: 30,
      unitInStock: '1000',
      discontinued: true,
      categoryId: categoryId,
      created_at: '1623925970055',
      updated_at: '1623925970055',
    },
  ];

  const mockProductService = {
    create: jest.fn().mockImplementation((product) => {
      return {
        ...product,
      };
    }),

    save: jest
      .fn()
      .mockImplementation((product) =>
        Promise.resolve({ _id: Date.now(), ...product }),
      ),

    all: jest.fn(() => of([productTest])),

    findById: jest.fn((userId: string) => {
      return productTest.filter((com) => com._id === userId)[0];
    }),

    update: jest.fn().mockImplementation((_id, product) => ({
      _id,
      ...product,
    })),

    delete: jest.fn((Id: string) => {
      return productTest.filter((com) => com._id === Id)[0];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    service = module.get(getModelToken(Product.name));
  });

  describe('product services', () => {
    it('should create a new product record and return that', async () => {
      const dto = {
        productName: 'Product Name',
        qtyPerUnit: '10',
        unitPrice: 30,
        unitInStock: '1000',
        discontinued: true,
        categoryId: categoryId,
      };
      const result = await service.create(dto);
      expect(result).toBeDefined();
      expect(mockProductService.create);
    });

    it('should give list of workShop ', async () => {
      const result = await service.all(
        {
          productName: 'vinod',
        },
        { page: 1 },
      );
      expect(result).toBeDefined();
      expect(mockProductService.all);
    });

    it('should find product by id', async () => {
      expect(await service.findById(Id)).toMatchObject(
        productTest.filter((obj) => obj._id === Id)[0],
      );
      expect(mockProductService.findById);
    });

    it('should update a product', async () => {
      const dto = {
        productName: 'Product Name',
        qtyPerUnit: '10',
        unitPrice: 30,
        unitInStock: '1000',
        discontinued: true,
        categoryId: categoryId,
      };
      expect(await service.update(Id, dto)).toEqual({
        _id: Id,
        ...dto,
      });
      expect(mockProductService.update);
    });

    it('should delete a product', async () => {
      const delReturn = await service.delete(Id);
      expect(typeof delReturn);
      expect(delReturn);
    });
  });
});
