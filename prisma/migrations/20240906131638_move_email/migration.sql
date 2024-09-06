/*
  Warnings:

  - You are about to drop the column `email` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Users_email_key";

-- AlterTable
ALTER TABLE "Accounts" ADD COLUMN     "email" VARCHAR(225) NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");
