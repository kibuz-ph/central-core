-- CreateTable
CREATE TABLE "public"."common_areas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "description" TEXT,
    "residentialComplexId" TEXT NOT NULL,

    CONSTRAINT "common_areas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."common_areas" ADD CONSTRAINT "common_areas_residentialComplexId_fkey" FOREIGN KEY ("residentialComplexId") REFERENCES "public"."residential_complexes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
