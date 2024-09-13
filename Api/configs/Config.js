import dotenv from "dotenv";
dotenv.config();

export const Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,

  // Database configuration
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PASS: process.env.DB_PASS || "root",
  DB_DATABASE: process.env.DB_DATABASE || "irish_collab_db",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://root:root@localhost:5432/irish_collab_db?schema=public",

  // JWT Secret
  SECRET_JWT: process.env.SECRET_JWT || 'default_secret_jwt',

  // MailJet API configuration
  MAILJET_API_KEY: process.env.MAILJET_API_KEY || "default_mailjet_api_key",
  MAILJET_API_SECRET: process.env.MAILJET_API_SECRET || "default_mailjet_api_secret",
  MAILJET_SENDER: process.env.MAILJET_SENDER || "default_sender_email@example.com"
};
