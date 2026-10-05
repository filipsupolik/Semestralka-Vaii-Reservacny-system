-- Move MenuCategory from restaurant-scoped to owner-scoped:
-- categories are shared across all restaurants of the same owner.

-- Add ownerId (nullable for now so we can backfill)
ALTER TABLE "MenuCategory" ADD COLUMN "ownerId" INTEGER;

-- Backfill ownerId from the owning restaurant
UPDATE "MenuCategory" mc
SET "ownerId" = r."ownerId"
FROM "Restaurant" r
WHERE mc."restaurantId" = r."restaurantId";

-- Remove categories left without an owner (their restaurant no longer exists)
DELETE FROM "MenuCategory" WHERE "ownerId" IS NULL;

ALTER TABLE "MenuCategory" ALTER COLUMN "ownerId" SET NOT NULL;

-- Drop the restaurant relation
ALTER TABLE "MenuCategory" DROP CONSTRAINT "MenuCategory_restaurantId_fkey";
ALTER TABLE "MenuCategory" DROP COLUMN "restaurantId";

-- Add the owner relation
ALTER TABLE "MenuCategory"
  ADD CONSTRAINT "MenuCategory_ownerId_fkey"
  FOREIGN KEY ("ownerId") REFERENCES "User"("userId")
  ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "MenuCategory_ownerId_idx" ON "MenuCategory"("ownerId");
