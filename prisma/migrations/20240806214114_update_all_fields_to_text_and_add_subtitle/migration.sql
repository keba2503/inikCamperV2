-- AlterTable
ALTER TABLE `Hero` ADD COLUMN `subtitle` TEXT NULL,
    MODIFY `title` TEXT NOT NULL,
    MODIFY `description` TEXT NOT NULL,
    MODIFY `imageUrl` TEXT NOT NULL;
