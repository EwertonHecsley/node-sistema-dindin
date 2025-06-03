import { FastifyRequest, FastifyReply } from 'fastify';

export function getUserIdOrThrow(request: FastifyRequest, reply: FastifyReply): string | null {
  const user_id = request.user?.userId;

  if (!user_id) {
    reply.status(401).send({ error: 'Unauthorized.' });
    return null;
  }

  return user_id;
}
