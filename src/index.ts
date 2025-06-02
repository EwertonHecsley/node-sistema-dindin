import fastify from 'fastify';
import { UserPrismaRepository } from './infra/database/repository/user/UserPrismaRepository';
import { UserController } from './infra/http/controllers/user/UserController';
import { UserRoutes } from './infra/http/routes/user/UserRoutes';
import { JwtService } from './shared/utils/services/JwtService';
import { authGuard } from './infra/http/middlewares/guards/authGuard';

const app = fastify();

app.decorate('jwtService', new JwtService(String(process.env.JWT_SECRET)));

const userRepository = new UserPrismaRepository();
const userController = new UserController(userRepository);
const userRoutes = new UserRoutes(userController);

app.post('/login', userController.login.bind(userController));

app.register(
  async api => {
    api.addHook('onRequest', authGuard);

    await userRoutes.register(api);
  },
  { prefix: '/api' },
);

export default app;
