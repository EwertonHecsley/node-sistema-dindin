import { Either, left, right } from '@/shared/utils/Either';
import { Transaction } from '../entity/Transition';
import { TransactionRepository } from '../repository/TransictionRepository';
import { UserRepository } from '../../user/repository/UserRepository';
import { NotFound } from '@/shared/errors/custom/NorFound';
import { CategoryRepository } from '../../category/repository/CategoryRepository';
import { Category } from '../../category/entity/Category';

type Request = {
    user_id: string;
};

type Response = Either<NotFound, { transaction: Transaction; categgory: Category }[]>;

export class ListAllTransactions {
    constructor(
        private readonly transactionsRepository: TransactionRepository,
        private readonly userRepository: UserRepository,
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async execute({ user_id }: Request): Promise<Response> {
        const userExist = await this.userRepository.findById(user_id);
        if (!userExist) {
            return left(new NotFound('User not found'));
        }

        const categories = await this.categoryRepository.findAll();
        const categoryMap = categories.filter(c => c.user_id === user_id);

        const transactions = await this.transactionsRepository.list(user_id);

        const responseData = transactions.map(transaction => {
            const category = categoryMap.find(
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
