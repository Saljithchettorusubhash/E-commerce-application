import {validationResult} from 'express-validator'
import { InvalidPropertiesException } from '../utils/Exceptions/validation.exception.js'
export const checkValidation =(req)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array());
        throw new InvalidPropertiesException('missing or invalid properties',{data:errors.array()});
    }
};