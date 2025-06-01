import { User } from '@/core/domain/user/entity/User';

export class UserPresenter {
  static toHTTP(entity: User): object {
    return {
      id: entity.getValueId().getValueId(),
      name: entity.name,
      email: entity.email.getValueEmail(),
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
