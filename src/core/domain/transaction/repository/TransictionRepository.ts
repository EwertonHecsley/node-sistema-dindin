import { Transaction } from '../entity/Transition';

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>;
}
