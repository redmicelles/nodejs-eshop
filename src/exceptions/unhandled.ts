import { HttpException  } from "./root";

export class UnhandledException extends HttpException {
    constructor(message: string, errorCode: number, error: any) {
        super(message, errorCode, 500, error)
    }
}