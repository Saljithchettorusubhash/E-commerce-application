import errorMiddleware from "../middleware/error.middleware.js";
import {InvalidEndpointException} from '../utils/Exceptions/api.exception.js'

class MiddlewareLoader  {
    static init (app) {
        app.all('*',(req,res,next)=>{
            const err = new InvalidEndpointException();
            next(err);
        });
        app.use(errorMiddleware)
        
    }
}
export {MiddlewareLoader}