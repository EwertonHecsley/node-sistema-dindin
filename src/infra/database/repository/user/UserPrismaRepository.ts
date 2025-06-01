import { UserRepository } from '@/core/domain/user/repository/UserRepository';
import getPrismaInstance from '../../prisma/singletonPrisma';
import { User } from '@/core/domain/user/entity/User';
import { UserPrismaMappers } from '../../prisma/mapper/UserPrismaMappers';

export class UserPrismaRepository implements UserRepository {
  private prisma = getPrismaInstance();

  async create(user: User): Promise<User> {
    const data = UserPrismaMappers.toDatabase(user);
    const result = await this.prisma.user.create({ data });
    return UserPrismaMappers.toDomain(result);
  }

  async findAll(): Promise<User[]> {
    const result = await this.prisma.user.findMany();
    return result.map(UserPrismaMappers.toDomain);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({ where: { email } });
    if (!result) return null;
    return UserPrismaMappers.toDomain(result);
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.prisma.user.findFirst({ where: { id } });
    if (!result) return null;
    return UserPrismaMappers.toDomain(result);
  }

  async save(user: User): Promise<void> {
    const data = UserPrismaMappers.toDatabase(user);
    await this.prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
