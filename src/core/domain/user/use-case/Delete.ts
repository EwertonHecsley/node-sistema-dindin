import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { UserRepository } from '../repository/UserRepository';
import { BadRequest } from '@/shared/errors/custom/BadRequest';

type Request = {
  id: string;
  user_id: string;
};

type Response = Either<NotFound | BadRequest, boolean>;

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute({ id, user_id }: Request): Promise<Response> {
    const userExist = await this.userRepository.findById(id);
    if (!userExist) return left(new NotFound('User not found.'));

    if (id == user_id) return left(new BadRequest('A logged-in user cannot delete their own account.'));

    await this.userRepository.delete(id);

    return right(true);
  }
}
