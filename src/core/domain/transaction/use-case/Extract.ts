import { NotFound } from '@/shared/errors/custom/NorFound';
import { Either, left, right } from '@/shared/utils/Either';
import { TransactionRepository } from '../repository/TransictionRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { calculateBalance } from '@/shared/utils/calculateBalance';

type ExtractRequest = {
  user_id: string;
};

type ExtractResponse = Either<NotFound, { entrada: number; saida: number }>;

export class ExtractUseCase {
  constructor(
    private readonly transactionsRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async execute({ user_id }: ExtractRequest): Promise<ExtractResponse> {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      return left(new NotFound('User not found.'));
    }

    const transactions = await this.transactionsRepository.list(user_id);

    const { income, expense } = calculateBalance(transactions);

    return right({
      entrada: income,
      saida: expense,
    });
  }
}
