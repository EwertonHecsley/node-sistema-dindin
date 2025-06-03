import { CategoryRepository } from '@/core/domain/category/repository/CategoryRepository';
import { CreateCategoryUseCase } from '@/core/domain/category/use-case/create';
import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCategoryDto } from './dto/schemaCategoryDto';
import { CategoryPresenter } from './presenter/CategoryPresenter';
import { logger } from '@/shared/utils/logger';

export class CategoryController {
  private readonly createCategory: CreateCategoryUseCase;

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.createCategory = new CreateCategoryUseCase(this.categoryRepository, this.userRepository);
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { description } = request.body as CreateCategoryDto;
    const user_id = request.user?.userId;
    if (!user_id) {
      reply.status(401).send({ error: 'Unauthorized.' });
      return;
    }

    const result = await this.createCategory.execute({ description, user_id });
    if (result.isLeft()) {
      logger.error('Error creating category.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(201).send({
      message: 'Category created sucessfully.',
      category: CategoryPresenter.toHTTP(result.value),
    });
    logger.info('Category created sucessfully.');
  }
}
