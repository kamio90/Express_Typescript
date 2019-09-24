import {NextFunction, Request, Response} from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, request: Request, reponse: Response, next: NextFunction){
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    reponse
    .status(status)
    .send({
        status,
        message
    });
}

export default errorMiddleware;