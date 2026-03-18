/*
  Warnings:

  - Made the column `steps` on table `routines` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "routines" ALTER COLUMN "steps" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;
