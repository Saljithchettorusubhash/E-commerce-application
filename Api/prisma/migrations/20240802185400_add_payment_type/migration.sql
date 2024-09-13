/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `PaymentType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PaymentType_value_key" ON "PaymentType"("value");
