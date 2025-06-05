import { Either, left, right } from '@/shared/utils/Either';
import { TransactionRepository } from '../repository/TransictionRepository';
import { NotFound } from '@/shared/errors/custom/NorFound';
import { Transaction } from '../entity/Transition';
import { CategoryRepository } from '../../category/repository/CategoryRepository';
import { TransitionType } from '../enum/TransitionType';
import { BadRequest } from '@/shared/errors/custom/BadRequest';

type Request = {
  description: string;
  value: number;
  date: string;
  category_id: string;
  user_id: string;
  type: string;
};

type Response = Either<NotFound, Transaction>;

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(props: Request): Promise<Response> {
    const { category_id, user_id } = props;
    const categoryExists = await this.categoryRepository.findById(category_id, user_id);
    if (!categoryExists) {
      return left(new NotFound('Category not found.'));
    }

    const parsedDate = new Date(props.date);
    if (isNaN(parsedDate.getTime())) {
      return left(new BadRequest("Invalid date format. Use 'YYYY-MM-DD'."));
    }

    const typeMap: Record<string, TransitionType> = {
      entrada: TransitionType.INCOME,
      saida: TransitionType.EXPENSE,
    };

    const type = typeMap[props.type.toLowerCase()];
    if (!type) {
      return left(new BadRequest("Invalid transaction type. Use 'entrada' or 'saida'."));
    }

    const transaction = Transaction.create({
      description: props.description,
      value: props.value,
      date: parsedDate,
      category_id: props.category_id,
      user_id: props.user_id,
      type,
    });

    await this.transactionRepository.create(transaction);

    return right(transaction);
  }
}
