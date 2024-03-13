import { Category } from "../entities/categoryEntity";
import { ICategoryInteractor } from "../interfaces/interactor_interface/ICategoryInteractor";
import { ICategoryRepository } from "../interfaces/repository_interface/ICategoryRepository";

export class CategoryInteractor implements ICategoryInteractor {
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
