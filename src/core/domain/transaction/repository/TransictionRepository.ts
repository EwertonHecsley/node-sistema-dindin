import { Transaction } from '../entity/Transition';

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<Transaction>;
  abstract list(id: string): Promise<Transaction[]>;
  abstract findById(id: string, user_id: string): Promise<Transaction | null>;
  abstract save(entity: Transaction): Promise<void>;
}
