import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { TransactionRepository } from '../repository/TransictionRepository';
import { UserRepository } from '../../user/repository/UserRepository';

type Request = {
  id: string;
  user_id: string;
};

type Response = Either<NotFound, boolean>;

export class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ id, user_id }: Request): Promise<Response> {
    const userExist = await this.userRepository.findById(user_id);
    if (!userExist) {
      return left(new NotFound('User not found'));
    }

    const transaction = await this.transactionRepository.findById(id, user_id);
    if (!transaction) {
      return left(new NotFound('Transaction not found'));
    }

    await this.transactionRepository.delete(id, user_id);

    return right(true);
  }
}
