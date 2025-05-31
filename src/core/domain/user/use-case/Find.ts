import { NotFound } from '../../../../shared/errors/custom/NorFound';
import { Either, left, right } from '../../../../shared/utils/Either';
import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';

type Request = {
  id: string;
};

type Response = Either<NotFound, User>;

export class FindUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Request): Promise<Response> {
    const user = await this.userRepository.findById(id);
    if (!user) return left(new NotFound('User not found'));

    return right(user);
  }
}
