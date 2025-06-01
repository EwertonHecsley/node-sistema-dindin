import { User } from '@/core/domain/user/entity/User';
import { User as UserDatabase } from '../../../../../generated/prisma';
import Identity from '@/core/generics/Identity';
import { Email } from '@/core/domain/user/object-value/Email';

export class UserPrismaMappers {
  static toDatabase(entity: User): UserDatabase {
    return {
      id: entity.getValueId().getValueId(),
      name: entity.name,
      email: entity.email.getValueEmail(),
      password: entity.password,
      createdAt: entity.createdAt ?? new Date(),
    };
  }

  static toDomain(entity: UserDatabase): User {
    return User.create(
      {
        name: entity.name,
        email: Email.create(entity.email),
        password: entity.password,
      },
      new Identity(entity.id),
    );
  }
}
