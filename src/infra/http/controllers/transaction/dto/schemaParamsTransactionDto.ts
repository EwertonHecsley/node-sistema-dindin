import { z } from 'zod';

export const schemaTransactionParamsDto = z.object({
    id: z.string().uuid({ message: 'Id invalid format not UUID.' }),
});

export type TransactionParamsDto = z.infer<typeof schemaTransactionParamsDto>;
