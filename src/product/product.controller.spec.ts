import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;

  let Id = '63a93e173c75e4ad92c79adc';
  let categoryId = '63a13f90a0a42611f950b45b';

  const product = {
    _id: Id,
    productName: 'Product Name',
    qtyPerUnit: '10',
    unitPrice: 30,
    unitInStock: '1000',
    discontinued: true,
    categoryId: categoryId,
    created_at: '1623925970055',
    updated_at: '1623925970055',
  };

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

  const mokProduct = {
    create: jest.fn().mockImplementation((product) => {
      return {
        ...product,
      };
    }),

    findById: jest.fn((Id: string) => {
      return productTest.filter((com) => com._id === Id)[0];
    }),

    all: jest.fn(() => of([product])),

    update: jest.fn().mockImplementation((_id, product) => ({
      _id,
      ...product,
    })),

    delete: jest.fn((Id: string) => {
      return productTest.filter((com) => com._id === Id)[0];
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mokProduct }],
    }).compile();

    controller = app.get<ProductController>(ProductController);
  });

  describe('product Controller', () => {
    it('should create a new product', async () => {
      const result = await controller.create(product);
      expect(result).toBeDefined();
    });

    it('should give list of product ', async () => {
      const result = await controller.all(
        {
          productName: 'vinod',
        },
        { page: 1 },
      );
      expect(result).toBeDefined();
    });

    it('should find product by id', async () => {
      const result = await controller.fetch(product._id);
      expect(result).toBeDefined();
    });

    it('should update a product', async () => {
      const result = await controller.update(product._id, product);
      expect(result).toBeDefined();
    });

    it('should delete product', async () => {
      const result = await controller.delete(product._id);
      expect(result).toBeDefined();
    });
  });
});
