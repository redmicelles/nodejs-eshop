import { Router } from "express";
import { signup, login } from "../controllers/auth";
import { errorHandler } from "../error-handler";

const authRouter: Router = Router()

authRouter.post('/signup', errorHandler(signup));

authRouter.post('/login', errorHandler(login))

export default authRouter