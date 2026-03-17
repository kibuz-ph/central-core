-- CreateTable
CREATE TABLE "apartments" (
    "id" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "reference" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "towerId" TEXT NOT NULL,
    "residentialComplexId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_towerId_fkey" FOREIGN KEY ("towerId") REFERENCES "towers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_residentialComplexId_fkey" FOREIGN KEY ("residentialComplexId") REFERENCES "residential_complexes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
