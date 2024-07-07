-- CreateTable
CREATE TABLE `Offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `bannerUrl` VARCHAR(191) NOT NULL,
    `firstParagraphTitle` VARCHAR(191) NOT NULL,
    `firstParagraphDescription` TEXT NOT NULL,
    `firstParagraphImageUrl1` VARCHAR(191) NOT NULL,
    `firstParagraphImageUrl2` VARCHAR(191) NOT NULL,
    `secondParagraphTitle` VARCHAR(191) NOT NULL,
    `secondParagraphDescription` TEXT NOT NULL,
    `secondParagraphImageUrl1` VARCHAR(191) NOT NULL,
    `secondParagraphImageUrl2` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
