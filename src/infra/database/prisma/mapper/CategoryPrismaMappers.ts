import { Category } from '@/core/domain/category/entity/Category';
import { Category as CategoryDatabase } from '../../../../../generated/prisma';
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

  static toDomain(entity: CategoryDatabase): Category {
    return Category.create(
      {
        ...entity,
      },
      new Identity(entity.id),
    );
  }
}
