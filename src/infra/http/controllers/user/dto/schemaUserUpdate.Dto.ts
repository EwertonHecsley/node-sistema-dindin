import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const schemaUserUpdateDto = z.object({
  name: z.string().optional(),
  email: z.string().regex(emailRegex, 'Format invalid.').optional(),
  password: z.string().min(4, 'Min 4 chacteres').optional(),
});

export type UpdateUserDto = z.infer<typeof schemaUserUpdateDto>;
