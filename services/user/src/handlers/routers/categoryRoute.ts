import { Router } from "express";
import { CategoryRepository } from "../../repositories/categoryRepository";
import { CategoryInteractor } from "../../interactors/categoryInteractor";
import { AddCategoryController } from "../controllers/Category/addCategoryController";
import { UpdateCategoryController } from "../controllers/Category/updateCategoryController";
import { DeleteCategoryController } from "../controllers/Category/deleteCategoryController";
import { GetOneCategory } from "../controllers/Category/getOneCategoryController";
import { GetAllCategory } from "../controllers/Category/getAllCategoryController";

const repository = new CategoryRepository();
const interactor = new CategoryInteractor(repository);
const addCategoryController = new AddCategoryController(interactor);
const updateCategory = new UpdateCategoryController(interactor);
const deleteCategory = new DeleteCategoryController(interactor);
const getSpecificCategory = new GetOneCategory(interactor);
const getAllCategory = new GetAllCategory(interactor);

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
