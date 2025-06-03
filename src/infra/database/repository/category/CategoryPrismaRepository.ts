import { CategoryRepository } from "@/core/domain/category/repository/CategoryRepository";
import getPrismaInstance from "../../prisma/singletonPrisma";
import { Category } from "@/core/domain/category/entity/Category";
import { CategoryPrismaMappers } from "../../prisma/mapper/CategoryPrismaMappers";

export class CategoryPrismaRepository implements CategoryRepository {
    private prisma = getPrismaInstance();

    async create(entity: Category): Promise<Category> {
        const data = CategoryPrismaMappers.toDatabase(entity);
        const result = await this.prisma.category.create({ data });
        return CategoryPrismaMappers.toDomain(result);
    }
}