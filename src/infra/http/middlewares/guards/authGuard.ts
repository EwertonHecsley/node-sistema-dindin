import { FastifyReply, FastifyRequest } from 'fastify';

export async function authGuard(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = request.server.jwtService.verify<{ userId: string }>(token);
    request.user = payload;
  } catch (error) {
    return reply.status(401).send({ error: 'Invalid token.' });
  }
}
