/*
  Warnings:

  - You are about to drop the column `categoryCategoryId` on the `RestaurantCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RestaurantCategory" DROP CONSTRAINT "RestaurantCategory_categoryCategoryId_fkey";

-- AlterTable
ALTER TABLE "RestaurantCategory" DROP COLUMN "categoryCategoryId";

-- AddForeignKey
ALTER TABLE "RestaurantCategory" ADD CONSTRAINT "RestaurantCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
