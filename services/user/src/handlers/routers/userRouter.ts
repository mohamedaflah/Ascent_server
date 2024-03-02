import { Router } from "express";
import { checkAuthentication } from "../../middlewares/checkAuthentication";

const userRouter = Router();

userRouter.use(checkAuthentication)
userRouter.route("/get-user");

export default userRouter;
