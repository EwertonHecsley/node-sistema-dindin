import { Either, left, right } from '@/shared/utils/Either';
import { Category } from '../entity/Category';
import { CategoryRepository } from '../repository/CategoryRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { NotFound } from '@/shared/errors/custom/NorFound';

type Request = {
  user_id: string;
};

type Response = Either<NotFound, Category[]>;

export class FindAllCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ user_id }: Request): Promise<Response> {
    const userExist = await this.userRepository.findById(user_id);
    if (!userExist) return left(new NotFound('User not found.'));

    const result = await this.categoryRepository.findAll();
    return right(result.filter(element => element.user_id == user_id));
  }
}
