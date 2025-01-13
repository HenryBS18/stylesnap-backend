/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the `PromptMessage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resultMessage` to the `Prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userMessage` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PromptMessage` DROP FOREIGN KEY `PromptMessage_promptId_fkey`;

-- AlterTable
ALTER TABLE `Prompt` DROP COLUMN `updatedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `resultMessage` TEXT NOT NULL,
    ADD COLUMN `userMessage` TEXT NOT NULL;

-- DropTable
DROP TABLE `PromptMessage`;
