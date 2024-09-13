import { body } from "express-validator";
import { Config } from "../configs/Config.js";
import {InternalServerException} from '../utils/Exceptions/api.exception.js'
import {TokenVerificationException,TokenExpiredException} from '../utils/Exceptions/auth.exception.js';

function errorMiddleware (err,req,res,next) {
    let errorInstance = err;
    
    if(errorInstance.status === 500 || !errorInstance.message) {

    if(!errorInstance.isOperational)
        errorInstance = new InternalServerException('Internal server error');

    } else if(errorInstance.name === "JsonWebTokenError") {
        errorInstance = new TokenVerificationException();

    }
    else if (errorInstance.message === "jwt expired") {
        errorInstance = new TokenExpiredException();
    }

    const {message,code,status,data,stack} = errorInstance;
    let responseStatus = status;
    if(!Number.isInteger(responseStatus) || responseStatus <100 || responseStatus > 600) {
        responseStatus = 500;
    }

    if(Config.NODE_ENV === "dev") {
        console.log(`[Exception] ${errorInstance}, [code] ${code}`);
        console.log(`[Error] ${message}`);
        console.log(`[Stack] ${stack}`)
    }
    const headers = {
        success:"0",
        error:errorInstance.name || " API Error",
        code: code || 14,
        message,
        ...(data && {data})
    };
    res.status(responseStatus).send({headers,body:{}});

}
export default errorMiddleware;