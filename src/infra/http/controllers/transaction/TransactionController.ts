import { CategoryRepository } from '@/core/domain/category/repository/CategoryRepository';
import { TransactionRepository } from '@/core/domain/transaction/repository/TransictionRepository';
import { CreateTransactionUseCase } from '@/core/domain/transaction/use-case/Create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateTransactionDto } from './dto/schemaTransactionDto';
import { getUserIdOrThrow } from '@/shared/utils/getUserIdOrThrow';
import { logger } from '@/shared/utils/logger';
import { TransactionPresenter } from './presenter/TransactionPresenter';

export class TransactionController {
  private readonly create: CreateTransactionUseCase;

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {
    this.create = new CreateTransactionUseCase(this.transactionRepository, this.categoryRepository);
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
      transaction: TransactionPresenter.toHTTP(result.value),
    });
    logger.info('Created transaction sucessfully.');
  }
}
