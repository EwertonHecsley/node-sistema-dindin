import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { CreateUserUseCase } from '@/core/domain/user/use-case/Create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from './dto/schemaUserDto';
import { logger } from '@/shared/utils/logger';
import { UserPresenter } from './presenter/UserPresenter';

export class UserController {
  private readonly createUser: CreateUserUseCase;

  constructor(private readonly userRepository: UserRepository) {
    this.createUser = new CreateUserUseCase(this.userRepository);
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { ...dataProps } = request.body as CreateUserDto;

    const result = await this.createUser.execute({ ...dataProps });
    if (result.isLeft()) {
      logger.error('Error creating user:');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(201).send({
      message: 'User created successfully',
      user: UserPresenter.toHTTP(result.value),
    });
    logger.info('User created successfully:');
  }
}
