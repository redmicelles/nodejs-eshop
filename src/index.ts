import express, { Express, NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import swaggerUi from 'swagger-ui-express';
import { PrismaClient } from '@prisma/client';
import { PORT } from './secrets';
import rootRouter from './routes';
import { errorMiddleware } from './middlewares/errors';
import swaggerConst from './openapi';

const app: Express = express()

const corsOptions: CorsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.static(__dirname))
app.use('/api-doc/swagger.css', (_req:Request, res: Response, next:NextFunction) => {
    res.set('Content-Type', 'text/css');
    next();
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerConst.swaggerSpec, swaggerConst.swaggerOptions));

app.disable('x-powered-by');

/**
 * @openapi
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

app.use('/api', rootRouter)

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