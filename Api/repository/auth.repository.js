import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../utils/mailjet.util.js";
import prisma from "../db/prismaClient.js";
import { Config } from "../configs/Config.js";

import {
  RegisterationfailedException,
  InvalidCredentialException,
  TokenVerificationException,
  OTPExpiredException,
  OTPGenerationException,
  OTPVerificationException,
} from "../utils/Exceptions/auth.exception.js";

import {
  NotFoundException,
  UpdateFailedExceptiom,
  UnexpectedException,
} from "../utils/Exceptions/database.exception.js";
import { hashPassword, structureResponse } from "../utils/common.util.js";
import { body } from "express-validator";

class AuthRepository {
  async registerUser(body) {
    try {
      const pass = body.password;
      await hashPassword(body);
      const existingUser = await prisma.user.findUnique({
        where: { email_address: body.email_address },
      });
      if (existingUser) {
        throw new RegisterationfailedException(
          "Email address already registered"
        );
      }
      const userData = {
        full_name: body.full_name,
        email_address: body.email_address,
        phone_number: body.phone_number || "",
        password: body.password,
        role: body.role || "USER",
      };

      const result = await prisma.user.create({
        data: userData,
      });
      if (!result) {
        throw new RegisterationfailedException();
      }
      return this.userLogin(body.email_address, pass, true);
    } catch (err) {
      console.log("Error in registration", err);
      throw new UnexpectedException("Registration failed");
    }
  }

  async userLogin(email_address, pass, is_Register = false) {
    console.log(`Attempting to find user with email_address: ${email_address}`);
    const user = await prisma.user.findUnique({ where: { email_address } });
    if (!user) {
      throw new InvalidCredentialException("Email not registered");
    }
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new InvalidCredentialException("Incorrect password");
    }
    const secretKey = Config.SECRET_JWT;

    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
      expiresIn: "24h",
    });
    let message = "";
    let responseBody = "";

    if (is_Register) {
      message = "Registered";
      responseBody = { user_id: user.id, token };
    } else {
      user.password = undefined;
      message = "Authenticated";
      responseBody = { ...user, token };
    }
    return structureResponse(responseBody, 1, message);
  }

  async refreshToken(body) {
    const { email_address, password: pass, oldToken } = body;
    const user = await prisma.user.findUnique({ where: { email_address } });

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new InvalidCredentialException("Incorrect password");
    }

    const secretKey = Config.SECRET_JWT;
    const { user_id } = jwt.decode(oldToken);

    if (user.id.toString() !== user_id) {
      throw new TokenVerificationException();
    }
    const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
      expiresIn: "24h",
    });

    return structureResponse({ token }, 1, "Refreshed");
  }

  async forgotPassword(body) {
    const user = await prisma.user.findUnique({
      where: { email_address: body.email_address },
    });
    if (!user) {
      throw new InvalidCredentialException("Email not registered");
    }
    await this.removeExpiredOTP(user.id);
    const OTP = await this.generateOTP(user.id);
    console.log(`OTP generated: ${OTP}`);
    await sendOTPEmail(user, OTP);
    return structureResponse({}, 1, "OTP generated and sent via email");
  }

  // Generate a custom numeric OTP of the specified length
  generateCustomOTP(length = 4) {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return otp;
  }

  async generateOTP(userId) {
    console.log("Generating OTP...");

    // Generate a numeric OTP
    const OTP = this.generateCustomOTP(4);
    console.log(`Generated OTP: ${OTP}`);
    if (!/^\d{4}$/.test(OTP)) {
      throw new Error(`Generated OTP is not numeric: ${OTP}`);
    }

    // Hash the OTP
    const OTPHash = await bcrypt.hash(OTP, 8);
    console.log(`Hashed OTP: ${OTPHash}`);

    const expiration_datetime = new Date();
    expiration_datetime.setHours(expiration_datetime.getHours() + 1);

    // Store the hashed OTP in the database
    const result = await prisma.oTP.create({
      data: {
        userId,
        otp: OTPHash,
        expiration_datetime,
      },
    });
    if (!result) throw new OTPGenerationException();
    console.log(`OTP stored in database with hash: ${OTPHash}`);
    return OTP;
  }

  async removeExpiredOTP(userId) {
    try {
      const result = await prisma.oTP.deleteMany({
        where: {
          userId,
          expiration_datetime: {
            lt: new Date(),
          },
        },
      });
      if (result.count === 0) {
        console.warn(`Expired OTP not found for user with id: ${userId}`);
        return;
      }
      console.log(
        `Deleted ${result.count} expired OTPs for user with id: ${userId}`
      );
    } catch (error) {
      console.error("Error in removeExpiredOTP:", error);
      throw new UnexpectedException("Error removing expired OTPs");
    }
  }

  async verifyOTP(body) {
    const { OTP, email_address } = body;
    console.log(`Verifying OTP: ${OTP} for email: ${email_address}`);

    // Retrieve the user by email address
    const user = await prisma.user.findUnique({
      where: { email_address },
      select: { id: true },
    });

    if (!user) {
      throw new OTPVerificationException();
    }

    // Retrieve the most recent OTP for the user
    const result = await prisma.oTP.findFirst({
      where: { userId: user.id },
      orderBy: { expiration_datetime: "desc" },
    });

    if (!result) {
      throw new OTPVerificationException();
    }

    console.log(`Stored OTP (hashed): ${result.otp}`);
    const { expiration_datetime, otp: OTPHash } = result;

    if (expiration_datetime < new Date()) {
      throw new OTPExpiredException();
    }

    // Adding a check for OTPHash consistency
    console.log(`Retrieved OTP hash: ${OTPHash}`);
    console.log(`Comparing with OTP: ${OTP}`);

    const isMatch = await bcrypt.compare(OTP, OTPHash);
    console.log(`OTP comparison result: ${isMatch}`);

    if (!isMatch) {
      throw new OTPVerificationException();
    }
    await prisma.oTP.delete({ where: { id: result.id } });
    return structureResponse({}, 1, "OTP verified successfully");
  }

  async changePassword(body) {
    const { email_address, password, new_password } = body;
    const user = await prisma.user.findUnique({ where: { email_address } });

    if (!user) {
      throw new NotFoundException("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new InvalidCredentialException("Incorrect password");
    }
    
    body.password = new_password;
    await hashPassword(body);

    const result = await prisma.user.update({
      where: { email_address },
      data: { password: body.password },
    });
    if (!result) {
      throw new UpdateFailedExceptiom("Password change failed");
    }
    return structureResponse({}, 1, "Password changed successfully");
  }

  async resetPassword(body) {
    const { email_address, OTP, new_password } = body;

    // Verify OTP
    const user = await prisma.user.findUnique({ where: { email_address } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otpRecord = await prisma.oTP.findFirst({
      where: { userId: user.id },
      orderBy: { expiration_datetime: 'desc' }
    });

    if (!otpRecord) {
      throw new OTPVerificationException();
    }

    const { expiration_datetime, otp: OTPHash } = otpRecord;

    if (expiration_datetime < new Date()) {
      throw new OTPExpiredException();
    }

    const isMatch = await bcrypt.compare(OTP, OTPHash);
    if (!isMatch) {
      throw new OTPVerificationException();
    }

    // Update password
    const hashedPassword = await bcrypt.hash(new_password, 8);

    const result = await prisma.user.update({
      where: { email_address },
      data: { password: hashedPassword },
    });

    if (!result) {
      throw new UpdateFailedExceptiom('Password reset failed');
    }

    // Delete the used OTP record
    await prisma.oTP.delete({ where: { id: otpRecord.id } });

    return structureResponse({}, 1, 'Password reset successfully');
  }


}

export default new AuthRepository();
