-- DropIndex
DROP INDEX `Config_typeId_fkey` ON `config`;

-- AlterTable
ALTER TABLE `config` MODIFY `pixels` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Config` ADD CONSTRAINT `Config_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
