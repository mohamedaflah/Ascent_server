import { Category } from "../../../domain/entities/CategoryEntity";

export interface ICategoryRepository {
  addCategory(body: Category): Promise<Category>;
  updateCategory(body: Category, id: string): Promise<Category>;
  deleteCategory(id: string): Promise<Category>;
  getCategory(id: string): Promise<Category>;
  getAllCategory(limit: number): Promise<Category[] | any[]>;
}
