import { FastifyInstance } from 'fastify';
import { TransactionController } from '../../controllers/transaction/TransactionController';
import { validateBody } from '../../middlewares/validate';
import { schemaTransactionDto } from '../../controllers/transaction/dto/schemaTransactionDto';

export class TransactionRoutes {
  constructor(private readonly controller: TransactionController) {}

  async register(app: FastifyInstance) {
    app.post('/v1/transaction', {
      preHandler: validateBody(schemaTransactionDto),
      handler: this.controller.store.bind(this.controller),
    });
    app.get('/v1/transaction', {
      handler: this.controller.list.bind(this.controller),
    });
    app.get('/v1/transaction/:id', {
      handler: this.controller.index.bind(this.controller),
    });
  }
}
