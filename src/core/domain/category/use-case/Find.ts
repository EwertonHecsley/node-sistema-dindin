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

    const caterorys = await this.categoryRepository.findAll();
    const result = caterorys.filter(element => element.user_id == user_id);
    const resultOk = result.find(element => element.getValueId().getValueId() == id);

    if (!resultOk) return left(new NotFound('Category not found.'));
    return right(resultOk);
  }
}
