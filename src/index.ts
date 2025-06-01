import fastify from 'fastify';
import { UserPrismaRepository } from './infra/database/repository/user/UserPrismaRepository';
import { UserController } from './infra/http/controllers/user/UserController';
import { UserRoutes } from './infra/http/routes/user/UserRoutes';

const app = fastify();

const userRepository = new UserPrismaRepository()
const userController = new UserController(userRepository);
const userRoutes = new UserRoutes(userController);

userRoutes.register(app);

export default app;
