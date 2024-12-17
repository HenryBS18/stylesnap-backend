/*
  Warnings:

  - Added the required column `createdAt` to the `PromptMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `PromptMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PromptMessage` ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL;
