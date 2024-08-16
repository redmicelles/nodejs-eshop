import express, {Express, NextFunction, Request, Response} from 'express'
import { PORT } from './secrets'
import authRouter from './routes/auth'
import { PrismaClient } from '@prisma/client'
import { errorMiddleware } from './middlewares/errors'
import { SignUpSchema } from './schemas/users'
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from '../swagger'

const app: Express = express()

app.use(express.json())

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health Check
 *     description: Health Check Endpoint
 *     responses:
 *       200:
 *         description: Server is alive
 */
app.get('/', (_req: Request, res: Response) => {
    res.status(200).json('Server is alive!')
})

app.use('/api/auth', authRouter)

export const prismaClient = new PrismaClient({
    log: ['query']
})

app.use(errorMiddleware)

//Catch all endpoint
app.all('*', function(_req: Request, res: Response, next: NextFunction){
    console.log(res.getHeaders);
    return res.status(404).json('Your request is not valid')
});

app.listen(PORT, () => {
    console.log('App working')
})