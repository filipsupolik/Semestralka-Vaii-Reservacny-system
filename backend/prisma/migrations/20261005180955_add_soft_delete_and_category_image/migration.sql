-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "deletedAt" TIMESTAMP(0);
