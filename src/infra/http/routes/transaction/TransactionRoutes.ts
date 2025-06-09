import { FastifyInstance } from 'fastify';
import { TransactionController } from '../../controllers/transaction/TransactionController';
import { validateBody } from '../../middlewares/validate';
import { schemaTransactionDto } from '../../controllers/transaction/dto/schemaTransactionDto';
import { schemaTransactionUpdateDto } from '../../controllers/transaction/dto/schemaTransactionUpdateDto';

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
    app.put('/v1/transaction/id:', {
      preHandler: validateBody(schemaTransactionUpdateDto),
      handler: this.controller.update.bind(this.controller),
    });
    app.delete('/v1/transaction/:id', {
      handler: this.controller.destroy.bind(this.controller),
    });
  }
}
