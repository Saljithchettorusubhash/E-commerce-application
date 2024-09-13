import { body } from "express-validator";
import { OTPRegex } from "../../utils/common.util.js";
import EmailValidator from "deep-email-validator";

export const forgotPWSchema = [
  body("email_address")
    .trim()
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email_address) => {
      const { valid } = await EmailValidator.validate(email_address);
      return valid;
    })
    .withMessage("Email unrecognized"),
];

export const changePWSchema = [
  body("email_address")
    .trim()
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email_address) => {
      const { valid } = await EmailValidator.validate(email_address);
    })
    .withMessage("Email unrecognized")
    .normalizeEmail(),
  body("password")
    .trim()
    .exists()
    .withMessage("Password field is required")
    .notEmpty()
    .withMessage("Password must be filled"),
  body("new_password")
    .trim()
    .exists()
    .withMessage("New password is required")
    .notEmpty()
    .withMessage("New password must be filled")
    .custom((value, { req }) => value !== req.body.password)
    .withMessage("New password can't be the same as the old password"),
];

export const resetPWSchema = [
  body("email_address")
    .trim()
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email_address) => {
      const { valid } = await EmailValidator.validate(email_address);
      return valid;
    })
    .withMessage("Email unrecognized")
    .normalizeEmail(),
  body("OTP")
    .trim()
    .exists()
    .withMessage("OTP is required")
    .matches(OTPRegex)
    .withMessage("OTP must be 4 digits")
    .isString()
    .withMessage("OTP must be a string"),
  body("new_password")
    .trim()
    .exists()
    .withMessage("New password is required")
    .notEmpty()
    .withMessage("New password must be filled")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),
];

export const verifyOTPSchema = [
  body("email_address")
    .trim()
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email_address) => {
      const { valid } = await EmailValidator.validate(email_address);
      return valid;
    })
    .withMessage("Email unrecognized")
    .normalizeEmail(),
  body("OTP")
    .trim()
    .exists()
    .withMessage("OTP is required")
    .matches(OTPRegex)
    .withMessage("OTP must be 4 digits")
    .isString()
    .withMessage("OTP must be a string"),
];

export const validateLogin = [
  body("email_address")
    .trim()
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  body("password")
    .trim()
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password cannot be empty"),
];

export const validateRefresh = [
  body("email_address")
    .trim()
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email_address) => {
      const { valid } = await EmailValidator.validate(email_address);
      return valid;
    })
    .withMessage("Email unrecognized")
    .normalizeEmail(),
  body("password")
    .trim()
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password must be filled"),
  body("oldToken")
    .trim()
    .exists()
    .withMessage("Old token is required for refreshing")
    .isJWT()
    .withMessage("Invalid token format"),
];
