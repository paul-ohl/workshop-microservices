import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user.service';
import { PrismaService } from '../src/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('UserService', () => {
  let service: UserService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('registerUser', () => {
    it('should register a user successfully', async () => {
      mockPrismaService.user.create.mockResolvedValue({
        email: 'newuser@example.com',
      });

      const result = await service.registerUser(
        'newuser@example.com',
        'password123',
        'user',
      );
      expect(result).toBe('Utilisateur créé: newuser@example.com');
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: 'newuser@example.com',
          password: expect.any(String), // Vérifie que le mot de passe est hashé
          role: 'user',
        },
      });
    });

    it('should throw an error if email is already used', async () => {
      mockPrismaService.user.create.mockRejectedValue({ code: 'P2002' });

      await expect(
        service.registerUser('newuser@example.com', 'password123', 'user'),
      ).rejects.toThrow(
        new HttpException('Email déjà utilisé', HttpStatus.CONFLICT),
      );
    });
  });

describe('loginUser', () => {
  it('should login a user successfully', async () => {
    const mockUser = {
      id: 1,
      email: 'existinguser@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user',
    };

    mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'mockedToken');

    const result = await service.loginUser(
      'existinguser@example.com',
      'password123',
    );

    expect(result).toEqual({ token: 'mockedToken', id: mockUser.id });
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'existinguser@example.com' },
    });
  });

  it('should throw an error if email or password is incorrect', async () => {
    // Simule l'absence d'utilisateur trouvé dans la base
    mockPrismaService.user.findUnique.mockResolvedValue(null);

    await expect(
      service.loginUser('nonexistent@example.com', 'password123'),
    ).rejects.toThrow(
      new HttpException(
        'Email ou mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      ),
    );
  });
});

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      mockPrismaService.user.delete.mockResolvedValue({});

      const result = await service.deleteUser(1);
      expect(result).toBe('Utilisateur supprimé');
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if deletion fails', async () => {
      mockPrismaService.user.delete.mockRejectedValue(
        new Error('Deletion failed'),
      );

      await expect(service.deleteUser(1)).rejects.toThrow(
        new HttpException(
          'Erreur lors de la suppression de l’utilisateur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      mockPrismaService.user.update.mockResolvedValue({
        id: 1,
        email: 'updated@example.com',
        role: 'admin',
      });

      const result = await service.updateUser(
        1,
        'updated@example.com',
        'newpassword123',
        'admin',
      );
      expect(result).toBe('Utilisateur mis à jour');
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          email: 'updated@example.com',
          password: expect.any(String), // Vérifie que le mot de passe est hashé
          role: 'admin',
        },
      });
    });

    it('should throw an error if email is already used', async () => {
      mockPrismaService.user.update.mockRejectedValue({ code: 'P2002' });

      await expect(
        service.updateUser(1, 'updated@example.com', 'newpassword123', 'admin'),
      ).rejects.toThrow(
        new HttpException('Email déjà utilisé', HttpStatus.CONFLICT),
      );
    });

    it('should throw a generic error if update fails', async () => {
      mockPrismaService.user.update.mockRejectedValue(
        new Error('Update failed'),
      );

      await expect(
        service.updateUser(1, 'updated@example.com', 'newpassword123', 'admin'),
      ).rejects.toThrow(
        new HttpException(
          'Erreur lors de la mise à jour de l’utilisateur',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
