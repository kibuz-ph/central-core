CREATE TYPE "ParkingLotType" AS ENUM ('SINGLE', 'DOUBLE');

CREATE TABLE "parking_lots" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "reference" TEXT NOT NULL,
    "description" TEXT,
    "type" "ParkingLotType" NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "parking_lots_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "parking_lots" ADD CONSTRAINT "parking_lots_apartmentId_fkey"
    FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
