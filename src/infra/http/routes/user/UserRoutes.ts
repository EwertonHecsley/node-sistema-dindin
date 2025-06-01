import { FastifyInstance } from 'fastify';
import { UserController } from '../../controllers/user/UserController';
import { validateBody } from '../../middlewares/validate';
import { schemaUserDto } from '../../controllers/user/dto/schemaUserDto';

export class UserRoutes {
  constructor(private readonly controller: UserController) {}

  async register(app: FastifyInstance) {
    app.post('/user/v1', {
      preHandler: validateBody(schemaUserDto),
      handler: this.controller.store.bind(this.controller),
    });

    app.get('/user/v1', {
      handler: this.controller.list.bind(this.controller),
    });

    app.get('/user/v1/:id', {
      handler: this.controller.index.bind(this.controller),
    });
  }
}
