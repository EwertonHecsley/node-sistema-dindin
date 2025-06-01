import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { UserRepository } from '../repository/UserRepository';

type Request = {
  id: string;
};

type Response = Either<NotFound, boolean>;

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: Request): Promise<Response> {
    const userExist = await this.userRepository.findById(id);
    if (!userExist) return left(new NotFound('User not found.'));

    await this.userRepository.delete(id);

    return right(true);
  }
}
