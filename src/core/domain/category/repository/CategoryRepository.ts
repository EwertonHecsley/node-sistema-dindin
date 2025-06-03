import { Category } from '../entity/Category';

export abstract class CategoryRepository {
  abstract create(entity: Category): Promise<Category>;
  abstract findById(id: string, user_id: string): Promise<Category | null>;
  abstract findAll(): Promise<Category[]>;
  abstract save(entity: Category): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
