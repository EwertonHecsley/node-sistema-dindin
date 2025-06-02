import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import { CreateUserUseCase } from '@/core/domain/user/use-case/Create';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserDto } from './dto/schemaUserDto';
import { logger } from '@/shared/utils/logger';
import { UserPresenter } from './presenter/UserPresenter';
import { ListAllUserUseCase } from '@/core/domain/user/use-case/List';
import { FindUserUseCase } from '@/core/domain/user/use-case/Find';
import { schemaUserParamsDto } from './dto/schemaUserParamsDto';
import { UpdateUserUseCase } from '@/core/domain/user/use-case/Update';
import { UpdateUserDto } from './dto/schemaUserUpdate.Dto';
import { DeleteUserUseCase } from '@/core/domain/user/use-case/Delete';
import { LoginUserDto } from './dto/schemaUserLoginDto';
import { Encrypter } from '@/shared/utils/Encrypter';

export class UserController {
  private readonly createUser: CreateUserUseCase;
  private readonly listUser: ListAllUserUseCase;
  private readonly findUser: FindUserUseCase;
  private readonly updateUser: UpdateUserUseCase;
  private readonly deleteUser: DeleteUserUseCase;
  private readonly encrypterService: Encrypter;

  constructor(private readonly userRepository: UserRepository) {
    this.createUser = new CreateUserUseCase(this.userRepository);
    this.listUser = new ListAllUserUseCase(this.userRepository);
    this.findUser = new FindUserUseCase(this.userRepository);
    this.updateUser = new UpdateUserUseCase(this.userRepository);
    this.deleteUser = new DeleteUserUseCase(this.userRepository);
    this.encrypterService = new Encrypter();
  }

  async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = request.body as LoginUserDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      logger.error('User not found.');
      reply.status(404).send({ message: 'Invalid credentials.' });
      return;
    }

    const passwordMatch = await this.encrypterService.compare(password, user.password);
    if (!passwordMatch) {
      logger.error('Invalid password.');
      reply.status(401).send({ message: 'Invalid credentials.' });
      return;
    }

    const token = request.server.jwtService.sign({ userId: user.getValueId().getValueId() });

    reply.status(200).send({
      message: 'Login successful.',
      user: UserPresenter.toHTTP(user),
      token,
    });
  }

  async store(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { ...dataProps } = request.body as CreateUserDto;

    const result = await this.createUser.execute({ ...dataProps });
    if (result.isLeft()) {
      logger.error('Error creating user.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(201).send({
      message: 'User created successfully.',
      user: UserPresenter.toHTTP(result.value),
    });
    logger.info('User created successfully.');
  }

  async list(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.listUser.execute();

    reply.status(200).send({
      message: 'List Users successfully.',
      user: result.value!.map(element => UserPresenter.toHTTP(element)),
    });
    logger.info('List Users sucessfully.');
  }

  async index(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const paramsValidate = schemaUserParamsDto.safeParse(request.params);
    if (!paramsValidate.success) {
      reply.status(400).send({
        message: paramsValidate.error.errors,
      });
      return;
    }

    const { id } = paramsValidate.data;

    const result = await this.findUser.execute({ id });
    if (result.isLeft()) {
      logger.error('Error find User.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(200).send({
      message: 'Find user sucessfully.',
      user: UserPresenter.toHTTP(result.value),
    });
    logger.info('Find user sucessfully.');
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const paramsValidate = schemaUserParamsDto.safeParse(request.params);
    const { ...data } = request.body as UpdateUserDto;

    if (!paramsValidate.success) {
      reply.status(400).send({
        message: paramsValidate.error.errors,
      });
      return;
    }

    const { id } = paramsValidate.data;
    const result = await this.updateUser.execute({ id, ...data });
    if (result.isLeft()) {
      logger.error('Error update user.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(204).send();
    logger.info('Update user sucessfully.');
  }

  async destroy(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const paramsValidate = schemaUserParamsDto.safeParse(request.params);
    if (!paramsValidate.success) {
      reply.status(400).send({
        message: paramsValidate.error.errors,
      });
      return;
    }

    const { id } = paramsValidate.data;

    const result = await this.deleteUser.execute({ id });
    if (result.isLeft()) {
      logger.error('Error deleting user.');
      const error = result.value;
      reply.status(error.statusCode).send({ message: error.message });
      return;
    }

    reply.status(204).send();
    logger.info('Delete user sucessfully.');
  }
}
