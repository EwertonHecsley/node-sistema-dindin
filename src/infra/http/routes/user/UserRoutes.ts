import { FastifyInstance } from 'fastify';
import { UserController } from '../../controllers/user/UserController';
import { validateBody } from '../../middlewares/validate';
import { schemaUserDto } from '../../controllers/user/dto/schemaUserDto';
import { schemaUserUpdateDto } from '../../controllers/user/dto/schemaUserUpdate.Dto';

export class UserRoutes {
  constructor(private readonly controller: UserController) {}

  async register(app: FastifyInstance) {
    app.post('/v1/user', {
      preHandler: validateBody(schemaUserDto),
      handler: this.controller.store.bind(this.controller),
    });

    app.get('/v1/user', {
      handler: this.controller.list.bind(this.controller),
    });

    app.get('/v1/user/:id', {
      handler: this.controller.index.bind(this.controller),
    });

    app.put('/v1/user/:id', {
      preHandler: validateBody(schemaUserUpdateDto),
      handler: this.controller.update.bind(this.controller),
    });

    app.delete('/v1/user/:id', {
      handler: this.controller.destroy.bind(this.controller),
    });
  }
}
