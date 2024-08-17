import { Request, Response, NextFunction } from "express"
import { ErrorCodes, HttpException } from "./exceptions/root"
import { UnhandledException } from "./exceptions/unhandled"

export const errorHandler = (controller_func: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller_func(req, res, next)
        } catch (error: any) {
            let exception: HttpException;
            if ( error instanceof HttpException) {
                exception = error
            } else {
                exception = new UnhandledException('Something went wrong', error, ErrorCodes.INTERNAL_EXCEPTION)
            }
            next(exception)
        }
    }
}