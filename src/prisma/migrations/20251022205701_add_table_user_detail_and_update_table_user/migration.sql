/*
  Warnings:

  - You are about to drop the column `birthday` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `document` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `secondLastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `secondName` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."users_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthday",
DROP COLUMN "document",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "role",
DROP COLUMN "secondLastName",
DROP COLUMN "secondName";

-- CreateTable
CREATE TABLE "user_details" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT,
    "lastName" TEXT NOT NULL,
    "secondLastName" TEXT,
    "birthday" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_details_email_key" ON "user_details"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_details_phone_key" ON "user_details"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_details_userId_key" ON "user_details"("userId");

-- AddForeignKey
ALTER TABLE "user_details" ADD CONSTRAINT "user_details_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
