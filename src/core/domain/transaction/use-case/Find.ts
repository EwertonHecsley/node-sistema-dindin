import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { Transaction } from '../entity/Transition';
import { TransactionRepository } from '../repository/TransictionRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { Category } from '../../category/entity/Category';
import { CategoryRepository } from '../../category/repository/CategoryRepository';

type Request = {
  id: string;
  user_id: string;
};

type Response = Either<NotFound, { transaction: Transaction; category: Category }>;

export class FindTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute({ id, user_id }: Request): Promise<Response> {
    const user = await this.userRepository.findById(user_id);
    if (!user) return left(new NotFound('User not found'));

    const transaction = await this.transactionRepository.findById(id, user_id);
    if (!transaction) return left(new NotFound('Transaction not found'));

    const category = await this.categoryRepository.findById(transaction.category_id, user_id);
    if (!category || category.user_id !== user_id) {
      return left(new NotFound('Category not found'));
    }

    return right({ transaction, category });
  }
}
