/*
  Warnings:

  - You are about to drop the column `accountId` on the `Transactions` table. All the data in the column will be lost.
  - Added the required column `accountFromId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountToId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_accountId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "accountId",
ADD COLUMN     "accountFromId" TEXT NOT NULL,
ADD COLUMN     "accountToId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountFromId_fkey" FOREIGN KEY ("accountFromId") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
