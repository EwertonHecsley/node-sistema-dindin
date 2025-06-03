import { Category } from '@/core/domain/category/entity/Category';

export class CategoryPresenter {
  static toHTTP(entity: Category) {
    return {
      id: entity.getValueId().getValueId(),
      description: entity.description,
      user_id: entity.user_id,
      createdAt: entity.createdAt.toLocaleDateString('pt-br', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    };
  }
}
