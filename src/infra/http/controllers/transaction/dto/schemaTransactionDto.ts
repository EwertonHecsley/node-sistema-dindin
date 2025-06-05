import { TransitionType } from '@/core/domain/transaction/enum/TransitionType';
import { z } from 'zod';

export const schemaTransactionDto = z.object({
    description: z.string().nonempty('Description is not empty.'),
    value: z.number().nonnegative('Value not negative.'),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Date invalid, use yyyy-MM-DD.' }),
    category_id: z.string().uuid(),
    type: z.enum([TransitionType.INCOME, TransitionType.EXPENSE]),
});

export type CreateTransactionDto = z.infer<typeof schemaTransactionDto>;