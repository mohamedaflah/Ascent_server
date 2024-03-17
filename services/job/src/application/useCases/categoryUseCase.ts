import { Category } from "../../domain/entities/CategoryEntity";
import { ICategoryRepository } from "../interfaces/repository_interface/ICategoryRepository";
import { ICategoryUseCase } from "../interfaces/userCase_interface/ICategoryUseCase";

export class CategoryUseCase implements ICategoryUseCase {
  private categoryRepository: ICategoryRepository;
  constructor(repo: ICategoryRepository) {
    this.categoryRepository = repo;
  }
  async addCategory(body: Category): Promise<Category> {
    return await this.categoryRepository.addCategory(body);
  }
  async updateCategory(body: Category, id: string): Promise<Category> {
    return await this.categoryRepository.updateCategory(body, id);
  }
  async deleteCategory(id: string): Promise<Category> {
    return await this.categoryRepository.deleteCategory(id);
  }
  async getCategory(id: string): Promise<Category> {
    return await this.categoryRepository.getCategory(id);
  }
  async getAllCategory(limit: number): Promise<any[] | Category[]> {
    return await this.categoryRepository.getAllCategory(limit);
  }
}
