import { ErrorCodes } from "../errorCodes.utils.js";
import { ErrorStatusCodes } from "../errorStatusCode.util.js";
import { Config } from "../../configs/Config.js";

class AuthException extends Error {
  constructor(code, message, data, status) {
    super(message);
    if (Config.NODE_ENV === "dev") this.message = "Auth Error:" + message;
    else this.message = message;
    this.name = "Auth Error";
    this.code = code;
    this.error = this.constructor.name;
    this.status = status;
    this.data = data;
  }
}

class UnauthorizedException extends AuthException {
  constructor(message = "User unauthorized for action", data) {
    super(ErrorCodes.UnauthorizedException, message, data);
  }
}
class TokenMissingException extends AuthException {
  constructor(message = "Access denied. No token credentials sent", data) {
    super(ErrorCodes.TokenMissingException, message, data);
  }
}
class TokenExpiredException extends AuthException {
  constructor(message = "Access denied. No token credential sent", data) {
    super(ErrorCodes.TokenExpiredException, message, data);
  }
}
class TokenVerificationException extends AuthException {
  constructor(message = "JWT expired", data) {
    super(ErrorCodes.TokenVerificationException, message, data);
  }
}
class OTPGenerationException extends AuthException {
  constructor(message = "OTP generation failed", data) {
    super(ErrorCodes.OTPGenerationException, message, data);
  }
}
class OTPExpiredException extends AuthException {
  constructor(message = "OTP expired", data) {
    super(ErrorCodes.OTPExpiredException, message, data);
  }
}
class OTPVerificationException extends AuthException {
  constructor(message = "OTP verification failed", data) {
    super(ErrorCodes.OTPExpiredException, message, data);
  }
}
class InvalidCredentialException extends AuthException {
  constructor(message, data) {
    super(ErrorCodes.InvalidCredentialException, message, data);
  }
}
class RegisterationfailedException extends AuthException {
  constructor(message = "User failed to be registrered", data) {
    super(
      ErrorCodes.RegisterFailedException,
      message,
      data,
      ErrorStatusCodes.RegisterationfailedException
    );
  }
}
export {UnauthorizedException,TokenMissingException,TokenExpiredException,TokenVerificationException,OTPGenerationException,OTPExpiredException,OTPVerificationException,InvalidCredentialException,RegisterationfailedException};