/*
  Warnings:

  - You are about to drop the `PromptHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PromptHistoryMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PromptHistory` DROP FOREIGN KEY `PromptHistory_userId_fkey`;

-- DropForeignKey
ALTER TABLE `PromptHistoryMessage` DROP FOREIGN KEY `PromptHistoryMessage_promptHistoryId_fkey`;

-- DropTable
DROP TABLE `PromptHistory`;

-- DropTable
DROP TABLE `PromptHistoryMessage`;

-- CreateTable
CREATE TABLE `Prompt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PromptMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` TEXT NOT NULL,
    `promptId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prompt` ADD CONSTRAINT `Prompt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromptMessage` ADD CONSTRAINT `PromptMessage_promptId_fkey` FOREIGN KEY (`promptId`) REFERENCES `Prompt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
