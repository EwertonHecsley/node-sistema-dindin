import { z } from 'zod';

export default class EviromentValidator {
  private readonly envSchema = z
    .object({
      NODE_ENV: z.enum(['development', 'production', 'test']),
      PORT: z.string().regex(/^\d+$/).transform(Number),
      DATABASE_URL: z.string().url(),
    })
    .passthrough();

  validateEnviromentVariables(): void {
    const result = this.envSchema.safeParse(process.env);

    if (!result.success) {
      console.log(result.error.format());
      process.exit(1);
    }

    const env = result.data;

    switch (env.NODE_ENV) {
      case 'development':
        console.log('Environment is set to development.');
        break;
      case 'production':
        console.log('Environment is set to production.');
        break;
      case 'test':
        console.log('Environment is set to test.');
        break;
    }

    console.log('Validating environment variables');
  }
}
