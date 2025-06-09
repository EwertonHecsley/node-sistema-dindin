import { Either, left, right } from '@/shared/utils/Either';
import { Transaction } from '../entity/Transition';
import { TransactionRepository } from '../repository/TransictionRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { NotFound } from '@/shared/errors/custom/NorFound';
import { CategoryRepository } from '../../category/repository/CategoryRepository';
import { Category } from '../../category/entity/Category';

type Request = {
  user_id: string;
  filter?: string
};

type Response = Either<NotFound, { transaction: Transaction; categgory: Category }[]>;

export class ListAllTransactions {
  constructor(
    private readonly transactionsRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) { }

  async execute({ user_id, filter }: Request): Promise<Response> {
    const userExist = await this.userRepository.findById(user_id);
    if (!userExist) {
      return left(new NotFound('User not found'));
    }

    const categories = await this.categoryRepository.findAll();
    const userCategories = categories.filter(c => c.user_id === user_id);

    let filteredCategoryId: string | undefined;


    if (filter) {
      const category = userCategories.find(c =>
        c.description.toLowerCase() === filter.toLowerCase()
      );

      if (!category) {
        return left(new NotFound('Category not found'));
      }

      filteredCategoryId = category.getValueId().getValueId();
    }

    const transactions = await this.transactionsRepository.list(user_id);

    const filteredTransactions = filteredCategoryId
      ? transactions.filter(t => t.category_id === filteredCategoryId)
      : transactions;

    const responseData = filteredTransactions.map(transaction => {
      const category = userCategories.find(
        c => c.getValueId().getValueId() === transaction.category_id,
      );
      return {
        transaction,
        categgory: category!,
      };
    });

    return right(responseData);
  }
}
