import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { UpdateUserUseCase } from '@/core/domain/user/use-case/Update';
import { BadRequest } from '@/shared/errors/custom/BadRequest';
import { NotFound } from '@/shared/errors/custom/NorFound';
import { Encrypter } from '@/shared/utils/Encrypter';
import { User } from '../../../../generated/prisma';

jest.mock('@/shared/utils/Encrypter');

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  const mockUserRepository = {
    findById: jest.fn(),
    findByEmail: jest.fn(),
    save: jest.fn(),
  };

  const mockEncrypterHash = jest.fn();

  beforeEach(() => {
    (Encrypter as jest.Mock).mockImplementation(() => ({
      hash: mockEncrypterHash,
    }));

    updateUserUseCase = new UpdateUserUseCase(mockUserRepository as unknown as UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar erro se o ID estiver ausente', async () => {
    const response = await updateUserUseCase.execute({
      email: 'teste@email.com',
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(BadRequest);
  });

  it('deve retornar erro se o usuário não existir', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const response = await updateUserUseCase.execute({
      id: '123',
      name: 'Novo Nome',
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFound);
  });

  it('deve retornar erro se o novo e-mail já existir', async () => {
    const user = { id: '123', name: 'Teste', email: 'teste@email.com' } as User;
    mockUserRepository.findById.mockResolvedValue(user);
    mockUserRepository.findByEmail.mockResolvedValue(user);

    const response = await updateUserUseCase.execute({
      id: '123',
      email: 'teste@email.com',
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(BadRequest);
  });

  it('deve retornar erro se o novo e-mail for inválido', async () => {
    const user = { id: '123', name: 'Teste', email: 'teste@email.com' } as User;
    mockUserRepository.findById.mockResolvedValue(user);
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const response = await updateUserUseCase.execute({
      id: '123',
      email: 'email-invalido',
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(BadRequest);
  });

  it('deve atualizar com sucesso apenas o nome', async () => {
    const user = { id: '123', name: 'Antigo', email: 'a@a.com', password: '123' } as User;
    mockUserRepository.findById.mockResolvedValue(user);

    const response = await updateUserUseCase.execute({
      id: '123',
      name: 'Novo Nome',
    });

    expect(user.name).toBe('Novo Nome');
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(response.isRight()).toBe(true);
  });

  it('deve atualizar com sucesso a senha', async () => {
    const user = { id: '123', name: 'Usuário', email: 'a@a.com', password: 'senha-antiga' } as User;
    mockUserRepository.findById.mockResolvedValue(user);
    mockEncrypterHash.mockResolvedValue('senha-hash');

    const response = await updateUserUseCase.execute({
      id: '123',
      password: 'nova-senha',
    });

    expect(user.password).toBe('senha-hash');
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(response.isRight()).toBe(true);
  });

  it('deve atualizar com sucesso o e-mail', async () => {
    const user = { id: '123', name: 'Usuário', email: 'old@email.com', password: 'senha' } as User;
    mockUserRepository.findById.mockResolvedValue(user);
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const response = await updateUserUseCase.execute({
      id: '123',
      email: 'novo@email.com',
    });

    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(response.isRight()).toBe(true);
  });
});
