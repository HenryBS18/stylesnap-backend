-- CreateTable
CREATE TABLE `Planner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OutfitPlanner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `outfitId` INTEGER NOT NULL,
    `plannerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Planner` ADD CONSTRAINT `Planner_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutfitPlanner` ADD CONSTRAINT `OutfitPlanner_outfitId_fkey` FOREIGN KEY (`outfitId`) REFERENCES `Outfit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutfitPlanner` ADD CONSTRAINT `OutfitPlanner_plannerId_fkey` FOREIGN KEY (`plannerId`) REFERENCES `Planner`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
