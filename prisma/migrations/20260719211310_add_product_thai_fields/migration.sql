-- Add Thai localization fields to Product
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "nameTh" TEXT;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "descriptionTh" TEXT;
