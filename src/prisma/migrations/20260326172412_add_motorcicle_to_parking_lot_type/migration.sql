-- AlterEnum
ALTER TYPE "public"."ParkingLotType" ADD VALUE 'MOTORCICLE';

-- DropForeignKey
ALTER TABLE "public"."apartments" DROP CONSTRAINT "apartments_towerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."parking_lots" DROP CONSTRAINT "parking_lots_apartmentId_fkey";

-- AlterTable
ALTER TABLE "public"."parking_lots" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."vehicles" ALTER COLUMN "id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."apartments" ADD CONSTRAINT "apartments_towerId_fkey" FOREIGN KEY ("towerId") REFERENCES "public"."towers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."parking_lots" ADD CONSTRAINT "parking_lots_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "public"."apartments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
