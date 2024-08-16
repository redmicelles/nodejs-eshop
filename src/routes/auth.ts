import { Router } from "express";
import { signup, login } from "../controllers/auth";

const authRouter: Router = Router()
/**
 * @swagger
 * /signup:
 *   signup:
 *     summary: User signup
 *     description: Users app account creation
 *     responses:
 *       201:
 *         description: Account created successfully
 */
authRouter.post('/signup', signup);


/**
 * @swagger
 * /login:
 *   login:
 *     summary: User Login
 *     description: Users app account login
 *     responses:
 *       200:
 *         description: Login successful
 */
authRouter.post('/login', login)

export default authRouter