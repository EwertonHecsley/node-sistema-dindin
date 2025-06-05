import { CategoryRepository } from '@/core/domain/category/repository/CategoryRepository';
import { CreateCategoryUseCase } from '@/core/domain/category/use-case/Create';
import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateCategoryDto } from './dto/schemaCategoryDto';
import { CategoryPresenter } from './presenter/CategoryPresenter';
import { logger } from '@/shared/utils/logger';
import { FindAllCategoryUseCase } from '@/core/domain/category/use-case/FindAll';
import { schemaCategoryParamsDto } from './dto/schemaCategoryParamsDto';
import { FindCategoryUseCase } from '@/core/domain/category/use-case/Find';
import { getUserIdOrThrow } from '@/shared/utils/getUserIdOrThrow';
import { UpdateCategoryUseCase } from '@/core/domain/category/use-case/Update';

export class CategoryController {
  private readonly createCategory: CreateCategoryUseCase;
  private readonly findAll: FindAllCategoryUseCase;
  private readonly find: FindCategoryUseCase;
  private readonly updateCategory: UpdateCategoryUseCase;

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.createCategory = new CreateCategoryUseCase(this.categoryRepository, this.userRepository);
    this.findAll = new FindAllCategoryUseCase(this.categoryRepository, this.userRepository);
    this.find = new FindCategoryUseCase(this.userRepository, this.categoryRepository);
    this.updateCategory = new UpdateCategoryUseCase(this.userRepository, this.categoryRepository);
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { description } = request.body as CreateCategoryDto;
    const user_id = getUserIdOrThrow(request, reply);
    if (!user_id) return;

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

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user_id = getUserIdOrThrow(request, reply);
    if (!user_id) return;

    const result = await this.findAll.execute({ user_id });
    if (result.isLeft()) {
      logger.error('Error list all categorys.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(200).send({
      message: 'List all categorys sucessfully.',
      category: result.value.map(element => CategoryPresenter.toHTTP(element)),
    });
    logger.info('List all categorys sucessfully.');
  }

  async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user_id = getUserIdOrThrow(request, reply);
    if (!user_id) return;

    const paramsValidate = schemaCategoryParamsDto.safeParse(request.params);
    if (!paramsValidate.success) {
      reply.status(400).send({
        message: paramsValidate.error.errors,
      });
      return;
    }

    const { id } = paramsValidate.data;

    const result = await this.find.execute({ id, user_id });
    if (result.isLeft()) {
      logger.error('Error find category.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(200).send({
      message: 'Find category sucessfully.',
      category: CategoryPresenter.toHTTP(result.value),
    });
    logger.info('Find category sucessfully.');
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { description } = request.body as CreateCategoryDto;
    const user_id = getUserIdOrThrow(request, reply);
    if (!user_id) return;

    const paramsValidate = schemaCategoryParamsDto.safeParse(request.params);
    if (!paramsValidate.success) {
      reply.status(400).send({
        message: paramsValidate.error.errors,
      });
      return;
    }

    const { id } = paramsValidate.data;

    const result = await this.updateCategory.execute({ id, user_id, description });
    if (result.isLeft()) {
      logger.error('Error update category.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(204).send();
    logger.info('Update category sucessfully.');
  }
}
