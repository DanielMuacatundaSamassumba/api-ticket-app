/*
  Warnings:

  - Made the column `code_reset` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `code_reset` VARCHAR(191) NOT NULL,
    MODIFY `phone_number` VARCHAR(191) NULL;
