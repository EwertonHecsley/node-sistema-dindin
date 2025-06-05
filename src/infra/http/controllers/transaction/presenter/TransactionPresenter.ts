import { Transaction } from '@/core/domain/transaction/entity/Transition';

export class TransactionPresenter {
  static toHTTP(entity: Transaction) {
    return {
      id: entity.getValueId().getValueId(),
      description: entity.description,
      value: entity.value,
      data: entity.createdAt.toLocaleDateString('pt-br', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
      usuario_id: entity.user_id,
      category_id: entity.category_id,
    };
  }
}
