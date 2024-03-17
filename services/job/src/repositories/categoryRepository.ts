import { ICategoryRepository } from "../application/interfaces/repository_interface/ICategoryRepository";
import { Category } from "../domain/entities/CategoryEntity";
import CategoryModel from "../infra/databases/mongodb/models/CategoryModel";


export class CategoryRepository implements ICategoryRepository {
  async addCategory(body: Category): Promise<Category> {
    const categoryExist = await CategoryModel.findOne({
      categoryname: body.categoryname.trim(),
    });
    if (categoryExist) throw new Error("Category Already Exist");
    const newCategory = await CategoryModel.create(body);
    return newCategory.toObject();
  }
  async updateCategory(body: Category, id: string): Promise<Category> {
    await CategoryModel.updateOne({ _id: id }, { $set: body });
    const updatedCategory = await CategoryModel.findById(id);
    if (!updatedCategory) throw new Error("Category not found");
    return updatedCategory.toObject();
  }
  async deleteCategory(id: string): Promise<Category> {
    const updatedCategory = await CategoryModel.findById(id);
    if (!updatedCategory) throw new Error("Category not found");
    updatedCategory.status = !updatedCategory.status;
    await updatedCategory.save();
    return updatedCategory.toObject();
  }
  async getCategory(id: string): Promise<Category> {
    const Category = await CategoryModel.findById(id);
    if (!Category) throw new Error("Category not found");
    return Category.toObject();
  }
  async getAllCategory(limit: number): Promise<Category[] | any[]> {
    const categories = await CategoryModel.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    return categories;
  }
}
