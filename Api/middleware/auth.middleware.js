import jwt from "jsonwebtoken";
import prisma from "../db/prismaClient.js";
import { Config } from "../configs/Config.js";
import {
  TokenMissingException,
  TokenVerificationException,
  UnauthorizedException,
} from "../utils/Exceptions/auth.exception.js";

const auth = (...roles) => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Bearer ";
      if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new TokenMissingException();
      }

      const token = authHeader.replace(bearer, "");
      const secretKey = Config.SECRET_JWT;
      const decoded = jwt.verify(token, secretKey);

      const user = await prisma.user.findUnique({
        where: { id: parseInt(decoded.user_id, 10) },
      });

      if (!user) {
        throw new TokenVerificationException();
      }

      if (roles.length && !roles.includes(user.role)) {
        throw new UnauthorizedException();
      }
      req.currentUser = user;
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

export default auth;
