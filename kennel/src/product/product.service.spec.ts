import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';

describe('ProductService', () => {
  let service: ProductService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of products', async () => {
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
      mockPrismaService.product.findMany.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findProductById', () => {
    it('should return a product by id', async () => {
      const result: Product = {
        name: 'Product 1',
        id: '1',
        price: 10,
        stock: 100,
      };
      mockPrismaService.product.findUnique.mockResolvedValue(result);

      expect(await service.findProductById('1')).toBe(result);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      try {
        await service.findProductById('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Product with id 999 not found');
      }
    });
  });

  describe('createProduct', () => {
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

      mockPrismaService.product.create.mockResolvedValue(result);

      expect(await service.createProduct(productData)).toBe(result);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const existingProduct = {
        name: 'Old Product',
        price: 36,
        stock: 230,
      };
      const updatedProduct = {
        name: 'Updated Product',
        price: 20,
        stock: 200,
      };

      mockPrismaService.product.findUnique.mockResolvedValue(existingProduct);

      mockPrismaService.product.update.mockResolvedValue(updatedProduct);

      const result = await service.updateProduct({
        id: '1',
        data: { name: 'Updated Product', price: 20, stock: 200 },
      });
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      try {
        await service.updateProduct({
          id: '999',
          data: { name: 'Updated Product' },
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Product with id 999 not found');
      }
    });
  });

  describe('deletePRoduct', () => {
    it('should delete a product', async () => {
      const existingProduct = {
        name: 'Old Product',
        price: 36,
        stock: 230,
      };
      const deletedProduct = {
        name: 'Deleted Product',
        price: 20,
        stock: 200,
      };

      mockPrismaService.product.findUnique.mockResolvedValue(existingProduct);

      mockPrismaService.product.delete.mockResolvedValue(deletedProduct);

      const result = await service.deleteProduct('1');
      expect(result).toEqual(deletedProduct);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      try {
        await service.deleteProduct('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Product with id 999 not found');
      }
    });
  });
});
