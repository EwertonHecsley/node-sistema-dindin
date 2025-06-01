import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { ListAllUserUseCase } from '@/core/domain/user/use-case/List';
import { User } from '../../../../generated/prisma';

const mockUserRepository = {
  findAll: jest.fn(),
};

describe('ListAllUserUseCase', () => {
  let listAllUserUseCase: ListAllUserUseCase;

  beforeEach(() => {
    listAllUserUseCase = new ListAllUserUseCase(mockUserRepository as unknown as UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar right com a lista de usuários quando houver usuários cadastrados', async () => {
    const users: User[] = [
      { id: '1', name: 'João', email: 'joao@email.com' } as User,
      { id: '2', name: 'Maria', email: 'maria@email.com' } as User,
    ];

    mockUserRepository.findAll.mockResolvedValue(users);

    const response = await listAllUserUseCase.execute();

    expect(mockUserRepository.findAll).toHaveBeenCalled();
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual(users);
  });
});
