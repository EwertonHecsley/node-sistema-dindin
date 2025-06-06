import { Transaction } from '@/core/domain/transaction/entity/Transition';
import { Transaction as TransactionDatabase } from '../../../../../generated/prisma';
import Identity from '@/core/generics/Identity';

export class TransactionPrismaMapper {
  static toDatabase(entity: Transaction): TransactionDatabase {
    return {
      id: entity.getValueId().getValueId(),
      description: entity.description,
      value: entity.value,
      date: entity.date,
      type: entity.type,
      category_id: entity.category_id,
      user_id: entity.user_id,
      createdAt: entity.createdAt,
    };
  }

  static toDomain(entity: TransactionDatabase): Transaction {
    return Transaction.create(
      {
        description: entity.description,
        value: entity.value,
        date: entity.date,
        type: entity.type,
        category_id: entity.category_id,
        user_id: entity.user_id,
        createdAt: entity.createdAt,
      },
      new Identity(entity.id),
    );
  }
}
