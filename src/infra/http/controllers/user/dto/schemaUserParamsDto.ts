import { z } from 'zod';

export const schemaUserParamsDto = z.object({
  id: z.string().uuid({ message: 'Id invalid format not UUID.' }),
});

export type UserParamsDto = z.infer<typeof schemaUserParamsDto>;
