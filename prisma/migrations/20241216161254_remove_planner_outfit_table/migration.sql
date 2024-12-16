/*
  Warnings:

  - You are about to drop the `PlannerOutfit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `outfitId` to the `Planner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PlannerOutfit` DROP FOREIGN KEY `PlannerOutfit_outfitId_fkey`;

-- DropForeignKey
ALTER TABLE `PlannerOutfit` DROP FOREIGN KEY `PlannerOutfit_plannerId_fkey`;

-- AlterTable
ALTER TABLE `Planner` ADD COLUMN `outfitId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `PlannerOutfit`;

-- AddForeignKey
ALTER TABLE `Planner` ADD CONSTRAINT `Planner_outfitId_fkey` FOREIGN KEY (`outfitId`) REFERENCES `Outfit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
