import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { Category } from '../entity/Category';
import { UserRepository } from '../../user/repository/UserRepository';
import { CategoryRepository } from '../repository/CategoryRepository';

type Request = {
  id: string;
  user_id: string;
};

type Response = Either<NotFound, Category>;

export class FindCategoryUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({ id, user_id }: Request): Promise<Response> {
    const userExist = await this.userRepository.findById(user_id);
    if (!userExist) return left(new NotFound('User not found.'));

    const result = await this.categoryRepository.findById(id, user_id);
    if (!result) return left(new NotFound('Category not found.'));

    return right(result);
  }
}
