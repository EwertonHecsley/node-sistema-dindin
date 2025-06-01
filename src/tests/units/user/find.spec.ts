import { User } from '@/core/domain/user/entity/User';
import { Email } from '@/core/domain/user/object-value/Email';
import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { FindUserUseCase } from '@/core/domain/user/use-case/Find';
import Identity from '@/core/generics/Identity';
import { NotFound } from '@/shared/errors/custom/NorFound';

const mockUserRepository = {
  findById: jest.fn(),
};

describe('FindUserUseCase', () => {
  let findUserUseCase: FindUserUseCase;

  beforeEach(() => {
    findUserUseCase = new FindUserUseCase(mockUserRepository as unknown as UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar um usuario com sucesso.', async () => {
    const fakeUser = User.create(
      { name: 'User', email: Email.create('email@email.com'), password: '123456' },
      new Identity('123'),
    );
    mockUserRepository.findById.mockResolvedValue(fakeUser);

    const response = await findUserUseCase.execute({ id: '123' });

    expect(mockUserRepository.findById).toHaveBeenCalledWith('123');
    expect(response.isRight()).toBe(true);
    expect(response.value).toBe(fakeUser);
  });

  it('Deve dar erro ao passar um ID invalido ou nao existe.', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const response = await findUserUseCase.execute({ id: '123' });

    expect(mockUserRepository.findById).toHaveBeenCalledWith('123');
    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(NotFound);
    if (response.isLeft()) {
      expect(response.value.message).toBe('User not found.');
    }
  });
});
