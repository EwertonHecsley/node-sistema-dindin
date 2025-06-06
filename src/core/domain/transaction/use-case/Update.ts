import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { TransactionRepository } from '../repository/TransictionRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { CategoryRepository } from '../../category/repository/CategoryRepository';

type UpdateRequest = {
  id: string;
  user_id: string;
  description?: string;
  value?: number;
  category_id?: string;
  date?: Date;
  type?: 'INCOME' | 'EXPENSE';
};

type UpdateResponse = Either<NotFound, boolean>;

export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(props: UpdateRequest): Promise<UpdateResponse> {
    const { id, user_id, category_id, description, type, value, date } = props;

    const user = await this.userRepository.findById(user_id);
    if (!user) return left(new NotFound('User not found'));

    const transaction = await this.transactionRepository.findById(id, user_id);
    if (!transaction) return left(new NotFound('Transaction not found'));

    if (category_id) {
      const category = await this.categoryRepository.findById(category_id, user_id);
      if (!category || category.user_id !== user_id) {
        return left(new NotFound('Category not found'));
      }
      transaction.category_id = category_id;
    }

    if (description !== undefined) transaction.description = description;
    if (value !== undefined) transaction.value = value;
    if (date !== undefined) transaction.date = date;
    if (type !== undefined) transaction.type = type;

    await this.transactionRepository.save(transaction);

    return right(true);
  }
}
