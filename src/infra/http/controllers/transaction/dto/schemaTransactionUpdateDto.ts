import { TransitionType } from '@/core/domain/transaction/enum/TransitionType';
import { z } from 'zod';

export const schemaTransactionUpdateDto = z.object({
  description: z.string().optional(),
  value: z.number().nonnegative('Value not negative.').optional(),
  date: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), { message: 'Date invalid, use yyyy-MM-DD.' })
    .optional(),
  category_id: z.string().uuid().optional(),
  type: z.enum([TransitionType.INCOME, TransitionType.EXPENSE]).optional(),
});

export type UpdateTransactionDto = z.infer<typeof schemaTransactionUpdateDto>;
