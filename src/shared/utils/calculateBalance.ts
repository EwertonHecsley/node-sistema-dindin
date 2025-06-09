import { Transaction } from '@/core/domain/transaction/entity/Transition';

export function calculateBalance(transactions: Transaction[]) {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'INCOME') acc.income += transaction.value;
      if (transaction.type === 'EXPENSE') acc.expense += transaction.value;
      return acc;
    },
    { income: 0, expense: 0 },
  );
}
