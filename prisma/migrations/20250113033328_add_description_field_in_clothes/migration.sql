/*
  Warnings:

  - Added the required column `description` to the `Clothes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Clothes` ADD COLUMN `description` TEXT NOT NULL;
