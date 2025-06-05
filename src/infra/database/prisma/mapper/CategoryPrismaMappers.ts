import { Category } from '@/core/domain/category/entity/Category';
import {
  Category as CategoryDatabase,
  Transaction as TransactionDatabase,
} from '../../../../../generated/prisma';
import Identity from '@/core/generics/Identity';

export class CategoryPrismaMappers {
  static toDatabase(entity: Category): CategoryDatabase {
    return {
      id: entity.getValueId().getValueId(),
      description: entity.description,
      user_id: entity.user_id,
      createdAt: entity.createdAt,
    };
  }

  static toDomain(entity: CategoryDatabase & { Transaction?: TransactionDatabase[] }): Category {
    const transactionCont = entity.Transaction?.length || 0;
    return Category.create(
      {
        description: entity.description,
        user_id: entity.user_id,
        createdAt: entity.createdAt,
        transactionCont,
      },
      new Identity(entity.id),
    );
  }
}
