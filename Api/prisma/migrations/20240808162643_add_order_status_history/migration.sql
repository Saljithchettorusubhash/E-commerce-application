/*
  Warnings:

  - You are about to drop the column `status` on the `OrderStatusHistory` table. All the data in the column will be lost.
  - Added the required column `newStatus` to the `OrderStatusHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previousStatus` to the `OrderStatusHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderStatusHistory" DROP COLUMN "status",
ADD COLUMN     "automated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "changedById" INTEGER,
ADD COLUMN     "newStatus" TEXT NOT NULL,
ADD COLUMN     "previousStatus" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT;

-- AddForeignKey
ALTER TABLE "OrderStatusHistory" ADD CONSTRAINT "OrderStatusHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
