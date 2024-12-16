/*
  Warnings:

  - You are about to drop the `OutfitPlanner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OutfitPlanner` DROP FOREIGN KEY `OutfitPlanner_outfitId_fkey`;

-- DropForeignKey
ALTER TABLE `OutfitPlanner` DROP FOREIGN KEY `OutfitPlanner_plannerId_fkey`;

-- DropTable
DROP TABLE `OutfitPlanner`;

-- CreateTable
CREATE TABLE `PlannerOutfit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plannerId` INTEGER NOT NULL,
    `outfitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlannerOutfit` ADD CONSTRAINT `PlannerOutfit_outfitId_fkey` FOREIGN KEY (`outfitId`) REFERENCES `Outfit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlannerOutfit` ADD CONSTRAINT `PlannerOutfit_plannerId_fkey` FOREIGN KEY (`plannerId`) REFERENCES `Planner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
