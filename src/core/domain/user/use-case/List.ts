import { Either, left, right } from '../../../../shared/utils/Either';
import { User } from '../entity/User';
import { UserRepository } from '../repository/UserRepository';

type Response = Either<null, User[]>;

export class ListAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Response> {
    const listUsers = await this.userRepository.findAll();
    if (!listUsers) return left(null);

    return right(listUsers);
  }
}
