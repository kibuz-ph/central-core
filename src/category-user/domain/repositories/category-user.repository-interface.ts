import { CategoryUser } from '../entities/category-user.entity';

export interface CategoryUserRepositoryInterface {
  findByName(name: string): Promise<CategoryUser | null>;
}
