import { User } from '@/core/domain/user/entity/User';
import { Email } from '@/core/domain/user/object-value/Email';
import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { CreateUserUseCase } from '@/core/domain/user/use-case/Create';
import { BadRequest } from '@/shared/errors/custom/BadRequest';

jest.mock('@/shared/utils/Encrypter', () => {
  return {
    Encrypter: jest.fn().mockImplementation(() => ({
      hash: jest.fn((password: string) => Promise.resolve(`hashed-${password}`)),
    })),
  };
});

const makeFakeUser = () => {
  const email = Email.create('valid@email.com');
  return User.create({
    name: 'User Teste',
    email,
    password: 'hashed-password',
  });
};

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      save: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('Deve criar um usuario novo com sucesso.', async () => {
    const Request = {
      name: 'Ewerton',
      email: 'email@email.com',
      password: '123',
    };

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.create.mockResolvedValue(makeFakeUser());

    const response = await createUserUseCase.execute(Request);

    expect(response.isRight()).toBe(true);
    if (response.isRight()) {
      expect(response.value).toBeInstanceOf(User);
    }
  });

  it('deve retornar erro se o email já existir', async () => {
    const request = {
      name: 'Ewerton',
      email: 'existente@example.com',
      password: '123456',
    };

    userRepository.findByEmail.mockResolvedValue(makeFakeUser());

    const response = await createUserUseCase.execute(request);

    expect(response.isLeft()).toBe(true);
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(BadRequest);
      expect(response.value.message).toBe('Email already exists.');
    }
  });

  it('deve retornar erro se o email for inválido', async () => {
    const request = {
      name: 'Ewerton',
      email: 'invalid-email',
      password: '123456',
    };

    userRepository.findByEmail.mockResolvedValue(null);

    const response = await createUserUseCase.execute(request);

    expect(response.isLeft()).toBe(true);
    if (response.isLeft()) {
      expect(response.value).toBeInstanceOf(BadRequest);
      expect(response.value.message).toBe('Invalid email format');
    }
  });
});
