/*
  Warnings:

  - Added the required column `name` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionId` to the `CollectionOutfit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Collection` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `CollectionOutfit` ADD COLUMN `collectionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CollectionOutfit` ADD CONSTRAINT `CollectionOutfit_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
