import { CategoryRepository } from '@/core/domain/category/repository/CategoryRepository';
import { TransactionRepository } from '@/core/domain/transaction/repository/TransictionRepository';
import { CreateTransactionUseCase } from '@/core/domain/transaction/use-case/Create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTransactionDto } from './dto/schemaTransactionDto';
import { getUserIdOrThrow } from '@/shared/utils/getUserIdOrThrow';
import { logger } from '@/shared/utils/logger';
import { TransactionPresenter } from './presenter/TransactionPresenter';
import { ListAllTransactions } from '@/core/domain/transaction/use-case/List';
import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { NotFound } from '@/shared/errors/custom/NorFound';

export class TransactionController {
  private readonly create: CreateTransactionUseCase;
  private readonly listAll: ListAllTransactions;

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.create = new CreateTransactionUseCase(this.transactionRepository, this.categoryRepository);
    this.listAll = new ListAllTransactions(
      this.transactionRepository,
      this.userRepository,
      this.categoryRepository,
    );
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const props = request.body as CreateTransactionDto;
    const user_id = getUserIdOrThrow(request, reply);
    if (!user_id) return;

    const result = await this.create.execute({ ...props, user_id });
    if (result.isLeft()) {
      logger.error('Erro create transaction.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(201).send({
      message: 'Created transaction sucessfully.',
      transaction: TransactionPresenter.toHTTP(result.value.transaction, result.value.category),
    });
    logger.info('Created transaction sucessfully.');
  }

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user_id = getUserIdOrThrow(request, reply);
    if (!user_id) return;

    const result = await this.listAll.execute({ user_id });
    if (result.isLeft()) {
      logger.error('Error listing transactions.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(200).send({
      message: 'Listed transactions sucessfully.',
      transactions: result.value.map(T => TransactionPresenter.toHTTP(T.transaction, T.categgory)),
    });
    logger.info('Listed transactions sucessfully.');
  }
}
