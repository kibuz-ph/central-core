/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `user_details` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "towers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "residentialComplexId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "towers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_details_document_key" ON "user_details"("document");

-- AddForeignKey
ALTER TABLE "towers" ADD CONSTRAINT "towers_residentialComplexId_fkey" FOREIGN KEY ("residentialComplexId") REFERENCES "residential_complexes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
