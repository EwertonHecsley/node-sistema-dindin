import 'fastify';
import { JwtService } from '@/shared/utils/services/JwtService';

declare module 'fastify' {
  interface FastifyInstance {
    jwtService: JwtService;
  }

  interface FastifyRequest {
    user?: {
      userId: string;
    };
  }
}
