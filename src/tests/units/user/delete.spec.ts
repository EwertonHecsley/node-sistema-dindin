import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { DeleteUserUseCase } from '@/core/domain/user/use-case/Delete';
import { NotFound } from '@/shared/errors/custom/NorFound';

const mockUserRepository = {
  findById: jest.fn(),
  delete: jest.fn(),
};

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;

  beforeEach(() => {
    deleteUserUseCase = new DeleteUserUseCase(mockUserRepository as unknown as UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar right(true) quando o usuário é encontrado e deletado com sucesso', async () => {
    const fakeUser = { id: '123', name: 'Ewerton' };
    mockUserRepository.findById.mockResolvedValue(fakeUser);
    mockUserRepository.delete.mockResolvedValue(undefined);

    const response = await deleteUserUseCase.execute({ id: '123' });

    expect(mockUserRepository.findById).toHaveBeenCalledWith('123');
    expect(mockUserRepository.delete).toHaveBeenCalledWith('123');
    expect(response.isRight()).toBe(true);
    expect(response.value).toBe(true);
  });

  it('deve retornar left(NotFound) quando o usuário não for encontrado', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const response = await deleteUserUseCase.execute({ id: '123' });

    expect(mockUserRepository.findById).toHaveBeenCalledWith('123');
    expect(mockUserRepository.delete).not.toHaveBeenCalled();
    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFound);
    if (response.isLeft()) {
      expect(response.value.message).toBe('User not found.');
    }
  });
});
