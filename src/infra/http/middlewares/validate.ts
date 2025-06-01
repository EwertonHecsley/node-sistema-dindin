import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodSchema } from 'zod';

export function validateBody<T extends ZodSchema>(schema: T) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      return reply.status(400).send({
        message: 'Invalid Data.',
        issues: result.error,
      });
    }

    request.body = result.data;
  };
}
