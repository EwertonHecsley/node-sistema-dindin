import { FastifyInstance } from 'fastify';
import { authGuard } from '../middlewares/guards/authGuard';
import { UserPrismaRepository } from '@/infra/database/repository/user/UserPrismaRepository';
import { UserController } from '../controllers/user/UserController';
import { UserRoutes } from './user/UserRoutes';
import { CategoryPrismaRepository } from '@/infra/database/repository/category/CategoryPrismaRepository';
import { CategoryController } from '../controllers/category/CategoryController';
import { CategoryRoutes } from './category/CategoryRoutes';
import { TransactionPrismaRepositoryi } from '@/infra/database/repository/transaction/TransactionPrismaRepository';
import { TransactionController } from '../controllers/transaction/TransactionController';
import { TransactionRoutes } from './transaction/TransactionRoutes';

export async function protectedRoutes(app: FastifyInstance) {
  app.addHook('onRequest', authGuard);

  //User
  const userRepository = new UserPrismaRepository();
  const userController = new UserController(userRepository);
  const userRoutes = new UserRoutes(userController);
  await userRoutes.register(app);

  //Category
  const categoryRepository = new CategoryPrismaRepository();
  const categoryController = new CategoryController(categoryRepository, userRepository);
  const categoryRoutes = new CategoryRoutes(categoryController);
  await categoryRoutes.register(app);

  //Transaction
  const transactionRepository = new TransactionPrismaRepositoryi();
  const transactionController = new TransactionController(
    categoryRepository,
    transactionRepository,
    userRepository,
  );
  const transactionroutes = new TransactionRoutes(transactionController);
  await transactionroutes.register(app);
}
