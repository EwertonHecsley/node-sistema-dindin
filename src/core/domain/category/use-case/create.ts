import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { Category } from '../entity/Category';
import { CategoryRepository } from '../repository/CategoryRepository';
import { UserRepository } from '../../user/repository/UserRepository';

type Request = {
  description: string;
  user_id: string;
};

type Response = Either<NotFound, Category>;

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(props: Request): Promise<Response> {
    const userExist = await this.userRepository.findById(props.user_id);
    if (!userExist) return left(new NotFound('User not found.'));

    const category = Category.create({ ...props });
    console.log(category.createdAt);
    await this.categoryRepository.create(category);

    return right(category);
  }
}
