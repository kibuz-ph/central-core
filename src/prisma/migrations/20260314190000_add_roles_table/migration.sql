-- CreateEnum
CREATE TYPE "user_role_types" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" TEXT NOT NULL,
    "name" "user_role_types" NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "public"."roles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_details_document_key" ON "public"."user_details"("document");
