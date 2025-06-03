import fastify from 'fastify';
import { UserPrismaRepository } from './infra/database/repository/user/UserPrismaRepository';
import { UserController } from './infra/http/controllers/user/UserController';
import { JwtService } from './shared/utils/services/JwtService';
import { protectedRoutes } from './infra/http/routes/protectedRoutes';

const app = fastify();

app.decorate('jwtService', new JwtService(String(process.env.JWT_SECRET)));

const userRepository = new UserPrismaRepository();
const userController = new UserController(userRepository);
app.post('/login', userController.login.bind(userController));

app.register(protectedRoutes, { prefix: '/api' });

export default app;
