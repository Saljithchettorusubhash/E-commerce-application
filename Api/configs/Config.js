import dotenv from "dotenv";
dotenv.config();

export const Config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PASS: process.env.DB_PASS || "root",
  DB_DATABASE: process.env.DB_DATABASE || "irish_collab_db",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://root:root@localhost:5432/irish_collab_db?schema=public",
    SECRET_JWT:process.env.SECRET_JWT || 'Saljith661',
    

  MAILJET_API_KEY:
    process.env.MAILJET_API_KEY || "d241b567c3a3128f7d073c6353cad0fc",

  MAILJET_API_SECRET:
    process.env.MAILJET_API_SECRET || "84891280ff1e5fdf611c1ade5e42e454",
  MAILJET_SENDER: process.env.MAILJET_SENDER || "saljithsubhash7@gmail.com",
};
