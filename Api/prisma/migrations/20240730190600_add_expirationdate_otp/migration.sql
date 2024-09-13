/*
  Warnings:

  - Added the required column `expiration_datetime` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "expiration_datetime" TIMESTAMP(3) NOT NULL;
