/*
  Warnings:

  - You are about to drop the column `menuItemId` on the `MenuCategory` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `MenuItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `totalPrice` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `price_at_order_time` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - The primary key for the `RestaurantCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OrderItem_menuItemId_key";

-- AlterTable
ALTER TABLE "MenuCategory" DROP COLUMN "menuItemId";

-- AlterTable
ALTER TABLE "MenuItem" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "price_at_order_time" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "RestaurantCategory" DROP CONSTRAINT "RestaurantCategory_pkey",
ADD COLUMN     "categoryCategoryId" INTEGER,
ALTER COLUMN "categoryId" DROP DEFAULT,
ADD CONSTRAINT "RestaurantCategory_pkey" PRIMARY KEY ("restaurantId", "categoryId");
DROP SEQUENCE "RestaurantCategory_categoryId_seq";

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "RestaurantCategory" ADD CONSTRAINT "RestaurantCategory_categoryCategoryId_fkey" FOREIGN KEY ("categoryCategoryId") REFERENCES "Category"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;
