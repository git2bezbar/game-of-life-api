/*
  Warnings:

  - You are about to drop the column `bounding_box` on the `config` table. All the data in the column will be lost.
  - You are about to alter the column `pixels` on the `config` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `bounding_box_x` to the `Config` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bounding_box_y` to the `Config` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Config_typeId_fkey` ON `config`;

-- AlterTable
ALTER TABLE `config` DROP COLUMN `bounding_box`,
    ADD COLUMN `bounding_box_x` VARCHAR(191) NOT NULL,
    ADD COLUMN `bounding_box_y` VARCHAR(191) NOT NULL,
    MODIFY `pixels` JSON NOT NULL;

-- AddForeignKey
ALTER TABLE `Config` ADD CONSTRAINT `Config_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
