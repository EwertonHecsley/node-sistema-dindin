import { z } from 'zod';

export const schemaCategoryParamsDto = z.object({
  id: z.string().uuid({ message: 'Id invalid format not UUID.' }),
});

export type CategoryParamsDto = z.infer<typeof schemaCategoryParamsDto>;
