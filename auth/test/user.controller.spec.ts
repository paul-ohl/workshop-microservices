import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/user.controller';
import { UserService } from '../src/user.service';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    registerUser: jest.fn(),
    loginUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('userRegister', () => {
    it('should register a user and return a success message', async () => {
      const res = mockResponse();
      mockUserService.registerUser.mockResolvedValue(
        'Utilisateur créé: email@example.com',
      );

      await controller.userRegister(
        'email@example.com',
        'password123',
        'user',
        res,
      );

      expect(mockUserService.registerUser).toHaveBeenCalledWith(
        'email@example.com',
        'password123',
        'user',
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Utilisateur créé: email@example.com',
      });
    });

    it('should return an error if registration fails', async () => {
      const res = mockResponse();
      mockUserService.registerUser.mockRejectedValue({
        status: HttpStatus.CONFLICT,
        message: 'Email déjà utilisé',
      });

      await controller.userRegister(
        'email@example.com',
        'password123',
        'user',
        res,
      );

      expect(res.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email déjà utilisé' });
    });
  });

  describe('userLogin', () => {
    it('should login a user and return a token', async () => {
      const res = mockResponse();
      mockUserService.loginUser.mockResolvedValue({
        token: 'mockedToken',
        id: 1,
      });

      await controller.userLogin('email@example.com', 'password123', res);

      expect(mockUserService.loginUser).toHaveBeenCalledWith(
        'email@example.com',
        'password123',
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Connexion réussie',
        token: 'mockedToken',
        id: 1,
      });
    });

    it('should return an error if login fails', async () => {
      const res = mockResponse();
      mockUserService.loginUser.mockRejectedValue({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Email ou mot de passe incorrect',
      });

      await controller.userLogin('email@example.com', 'wrongpassword', res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email ou mot de passe incorrect',
      });
    });
  });

  describe('userDelete', () => {
    it('should delete a user and return a success message', async () => {
      const res = mockResponse();
      mockUserService.deleteUser.mockResolvedValue('Utilisateur supprimé');

      await controller.userDelete(1, res);

      expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Utilisateur supprimé',
      });
    });

    it('should return an error if deletion fails', async () => {
      const res = mockResponse();
      mockUserService.deleteUser.mockRejectedValue({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erreur lors de la suppression de l’utilisateur',
      });

      await controller.userDelete(1, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erreur lors de la suppression de l’utilisateur',
      });
    });
  });

  describe('userPut', () => {
    it('should update a user and return a success message', async () => {
      const res = mockResponse();
      mockUserService.updateUser.mockResolvedValue('Utilisateur mis à jour');

      await controller.userPut(
        1,
        'updated@example.com',
        'newpassword123',
        'admin',
        res,
      );

      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        1,
        'updated@example.com',
        'newpassword123',
        'admin',
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Utilisateur mis à jour',
      });
    });

    it('should return an error if update fails', async () => {
      const res = mockResponse();
      mockUserService.updateUser.mockRejectedValue({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Erreur lors de la mise à jour de l’utilisateur',
      });

      await controller.userPut(
        1,
        'updated@example.com',
        'newpassword123',
        'admin',
        res,
      );

      expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erreur lors de la mise à jour de l’utilisateur',
      });
    });
  });
});
