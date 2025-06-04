import { CategoryRepository } from '@/core/domain/category/repository/CategoryRepository';
import getPrismaInstance from '../../prisma/singletonPrisma';
import { Category } from '@/core/domain/category/entity/Category';
import { CategoryPrismaMappers } from '../../prisma/mapper/CategoryPrismaMappers';

export class CategoryPrismaRepository implements CategoryRepository {
  private prisma = getPrismaInstance();

  async create(entity: Category): Promise<Category> {
    const data = CategoryPrismaMappers.toDatabase(entity);
    const result = await this.prisma.category.create({ data });
    return CategoryPrismaMappers.toDomain(result);
  }

  async findById(id: string, user_id: string): Promise<Category | null> {
    const result = await this.prisma.category.findFirst({ where: { id, user_id } });
    return result ? CategoryPrismaMappers.toDomain(result) : null;
  }

  async findAll(): Promise<Category[]> {
    const result = await this.prisma.category.findMany();
    return result.map(CategoryPrismaMappers.toDomain);
  }

  async save(entity: Category): Promise<void> {
    const id = entity.getValueId().getValueId();
    const data = CategoryPrismaMappers.toDatabase(entity);
    await this.prisma.category.update({ data, where: { id, user_id: entity.user_id } });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
}
