import { Router } from "express";
import { CategoryRepository } from "../../../repositories/categoryRepository";
import { CategoryUseCase } from "../../../application/useCases/categoryUseCase";
import { AddCategoryController } from "../controllers/Category/addCategoryController";
import { UpdateCategoryController } from "../controllers/Category/updateCategoryController";
import { DeleteCategoryController } from "../controllers/Category/deleteCategoryController";
import { GetOneCategory } from "../controllers/Category/getOneCategoryController";
import { GetAllCategory } from "../controllers/Category/getAllCategoryController";


const repository = new CategoryRepository();
const useCase = new CategoryUseCase(repository);
const addCategoryController = new AddCategoryController(useCase);
const updateCategory = new UpdateCategoryController(useCase);
const deleteCategory = new DeleteCategoryController(useCase);
const getSpecificCategory = new GetOneCategory(useCase);
const getAllCategory = new GetAllCategory(useCase);

const categoryRoute = Router();

categoryRoute.post(
  "/add-category",
  addCategoryController.addCategory.bind(addCategoryController)
);
categoryRoute.post(
  "/update-category/:id",
  updateCategory.updateCategory.bind(updateCategory)
);
categoryRoute.get(
  "/delete-category/:id",
  deleteCategory.deleteCategory.bind(deleteCategory)
);
categoryRoute.get(
  "/get-category/:id",
  getSpecificCategory.getSpecificCategory.bind(getSpecificCategory)
);
categoryRoute.get(
  "/getall-category",
  getAllCategory.getAllCategory.bind(getAllCategory)
);

export default categoryRoute;
