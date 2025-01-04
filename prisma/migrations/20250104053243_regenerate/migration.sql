/*
  Warnings:

  - Added the required column `answerListId` to the `UserQuestionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserQuestionAnswer` DROP FOREIGN KEY `UserQuestionAnswer_userId_fkey`;

-- AlterTable
ALTER TABLE `UserQuestionAnswer` ADD COLUMN `answerListId` INTEGER NOT NULL,
    MODIFY `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `UserAnswerList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memo` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAnswerList` ADD CONSTRAINT `UserAnswerList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuestionAnswer` ADD CONSTRAINT `UserQuestionAnswer_answerListId_fkey` FOREIGN KEY (`answerListId`) REFERENCES `UserAnswerList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuestionAnswer` ADD CONSTRAINT `UserQuestionAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
