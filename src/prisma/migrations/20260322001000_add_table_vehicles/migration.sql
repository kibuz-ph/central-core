CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTORCICLE', 'BYCICLE');

CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "type" "VehicleType" NOT NULL,
    "brand" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_apartmentId_fkey"
    FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
