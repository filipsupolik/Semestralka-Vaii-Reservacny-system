-- AlterTable
ALTER TABLE "Ingredient" RENAME COLUMN "id" TO "ingredientId";

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
