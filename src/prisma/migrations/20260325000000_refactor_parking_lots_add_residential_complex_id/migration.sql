ALTER TABLE "parking_lots" ALTER COLUMN "apartmentId" DROP NOT NULL;

ALTER TABLE "parking_lots" ADD COLUMN "residentialComplexId" TEXT NOT NULL;

ALTER TABLE "parking_lots" ADD CONSTRAINT "parking_lots_residentialComplexId_fkey"
    FOREIGN KEY ("residentialComplexId") REFERENCES "residential_complexes"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
