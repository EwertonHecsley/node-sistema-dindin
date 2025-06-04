import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { UserRepository } from '../../user/repository/UserRepository';
import { CategoryRepository } from '../repository/CategoryRepository';

type Request = {
  id: string;
  description: string;
  user_id: string;
};

type Response = Either<NotFound, boolean>;

export class UpdateCategoryUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({ id, user_id, description }: Request): Promise<Response> {
    const userExist = await this.userRepository.findById(user_id);
    if (!userExist) return left(new NotFound('User not found.'));

    const categoryExist = await this.categoryRepository.findById(id, user_id);
    if (!categoryExist) return left(new NotFound('Category not found.'));

    categoryExist.updateDescription(description);

    await this.categoryRepository.save(categoryExist);

    return right(true);
  }
}
