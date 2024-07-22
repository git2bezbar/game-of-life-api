/*
  Warnings:

  - You are about to alter the column `bounding_box_x` on the `config` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `bounding_box_y` on the `config` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `Config_typeId_fkey` ON `config`;

-- AlterTable
ALTER TABLE `config` MODIFY `bounding_box_x` INTEGER NOT NULL,
    MODIFY `bounding_box_y` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Config` ADD CONSTRAINT `Config_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
