import { Router } from "express";
import { checkAuthentication } from "../../middlewares/checkAuthentication";
import { UserRepository } from "../../repositories/userRepository";
import { UserInteractor } from "../../interactors/userInteractor";
import { UserController } from "../controllers/userController";

const userRouter = Router();
const repository = new UserRepository();
const interactor = new UserInteractor(repository);
const userController = new UserController(interactor);

userRouter.post(
  `/update-password`,
  userController.updatePassword.bind(userController)
);
userRouter.patch(
  `/update-profile/:userId`,
  userController.updateProfile.bind(userController)
);
userRouter.get(
  "/get-allusers",
  userController.getAllusres.bind(userController)
);
userRouter.route(`/saved-job`).post(userController.saveNewJob.bind(userController))
userRouter.use(checkAuthentication);
userRouter
  .route("/get-user")
  .get(userController.getUserData.bind(userController));


export default userRouter;
