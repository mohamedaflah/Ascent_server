import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthRepository } from "../../repositories/authRepository";
import { AuthInteractor } from "../../interactors/authInteractor";

const authRouter = Router();

const authrepository = new AuthRepository();
const authinteractor = new AuthInteractor(authrepository);
const controller = new AuthController(authinteractor);
authRouter.route("/signup").post(controller.signup.bind(controller));
authRouter.route("/login").post(controller.login.bind(controller));
authRouter.get("/logout", controller.logout.bind(controller));
authRouter.get('/verify-email/:token',controller.verifyEmail.bind(controller))
authRouter.get("/check-role",controller.checkRole.bind(controller))
// authRouter.get('/get-user')
// authRouter.route('')
export default authRouter;
