import { Category } from '../entity/Category';

export abstract class CategoryRepository {
  abstract create(entity: Category): Promise<Category>;
}
