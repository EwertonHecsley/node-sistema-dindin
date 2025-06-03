import { FastifyInstance } from 'fastify';
import { CategoryController } from '../../controllers/category/CategoryController';
import { validateBody } from '../../middlewares/validate';
import { schemaCategoryDto } from '../../controllers/category/dto/schemaCategoryDto';

export class CategoryRoutes {
  constructor(private readonly controller: CategoryController) {}

  async register(app: FastifyInstance) {
    app.post('/v1/category', {
      preHandler: validateBody(schemaCategoryDto),
      handler: this.controller.store.bind(this.controller),
    });
  }
}
