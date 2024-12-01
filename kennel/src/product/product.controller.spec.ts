import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;

  const mockProductService = {
    findAll: jest.fn(),
    findProductById: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const result: Product[] = [
        {
          name: 'Product 1',
          id: '1',
          price: 10,
          stock: 100,
        },
        {
          name: 'Product 2',
          id: '2',
          price: 30,
          stock: 150,
        },
      ];
      mockProductService.findAll.mockResolvedValue(result);

      expect(await controller.getAllProducts()).toBe(result);
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const result: Product = {
        name: 'Product 1',
        id: '1',
        price: 10,
        stock: 100,
      };
      mockProductService.findProductById.mockResolvedValue(result);

      expect(await controller.getProductById('1')).toBe(result);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductService.findProductById.mockResolvedValue(null);

      try {
        await controller.getProductById('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Product with ID 999 not found');
      }
    });
  });

  describe('createNewProduct', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Product 1',
        price: 10,
        stock: 100,
      };
      const result: Product = {
        id: '1',
        ...productData,
      };

      mockProductService.createProduct.mockResolvedValue(result);

      expect(await controller.createNewProduct(productData)).toBe(result);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const productData = {
        name: 'Updated Product',
        price: 36,
        stock: 230,
      };
      const result: Product = { id: '1', ...productData };

      mockProductService.updateProduct.mockResolvedValue(result);

      expect(await controller.updateProduct('1', productData)).toBe(result);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const result: Product = {
        name: 'Product 1',
        id: '1',
        price: 0,
        stock: 0,
      };

      mockProductService.deleteProduct.mockResolvedValue(result);

      expect(await controller.deleteProduct('1')).toBe(result);
    });
  });
});
