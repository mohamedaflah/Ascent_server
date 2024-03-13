import { Category } from "../entities/categoryEntity";
import CategoryModel from "../infra/mongodb/Schema/CategoryModel";
import { ICategoryRepository } from "../interfaces/repository_interface/ICategoryRepository";

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
    await CategoryModel.updateMany({ _id: id }, { $set: { status: false } });
    const updatedCategory = await CategoryModel.findById(id);
    if (!updatedCategory) throw new Error("Category not found");
    return updatedCategory.toObject();
  }
  async getCategory(id: string): Promise<Category> {
    const Category = await CategoryModel.findById(id);
    if (!Category) throw new Error("Category not found");
    return Category.toObject();
  }
  async getAllCategory(limit: number): Promise<Category[]|any[]> {
    const categories=await CategoryModel.find({}).limit(limit)
    return categories
  }
}
