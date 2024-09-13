import { Config } from "../../configs/Config.js";
import { ErrorCodes } from "../errorCodes.utils.js";
import { ErrorStatusCodes } from "../errorStatusCode.util.js";

class ApiException extends Error {
    constructor(code,message,data,status = 401) {
        super(message);
      if (Config.NODE_ENV === "dev") this.message ="Api Error" + message;
      else this.message =message;
      this.name = "Api Error";
      this.code = code;
      this.error = this.constructor.name;
      this.status = status;
      this.data = data;
    } 
}
class InternalServerException extends ApiException {
    constructor(message,data) {
        super(ErrorCodes.InternalServerException,message,data,ErrorStatusCodes.InternalServerException);
    }

}
class InvalidEndpointException extends ApiException {
    constructor (message ="Endpoint not found",data) {
    super(ErrorCodes.InvalidEndPointException,message,data,ErrorCodes.InvalidEndPointException);
    }
}
class UnimplementedException extends ApiException {
    constructor (message = "API unimplmented", data) {
        super(ErrorCodes.UnimplementedException,message,data,ErrorStatusCodes.UnimplementedException);
    }
}
class HealthCheckFailedException extends ApiException {
    constructor(data) {
        super (ErrorCodes.HealthCheckFailedException,"API failed to run",data,ErrorStatusCodes.HealthCheckFailedException)
    }
}
export {InternalServerException,InvalidEndpointException,UnimplementedException,HealthCheckFailedException};

