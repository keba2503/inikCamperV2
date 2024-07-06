/*
  Warnings:

  - Added the required column `avatarUrl` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Review` ADD COLUMN `avatarUrl` VARCHAR(191) NOT NULL;
