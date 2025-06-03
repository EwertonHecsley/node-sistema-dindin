import { z } from 'zod';

export const schemaCategoryDto = z.object({
  description: z.string().nonempty('Description is required.'),
});

export type CreateCategoryDto = z.infer<typeof schemaCategoryDto>;
