-- CreateEnum
CREATE TYPE "UserApartmentType" AS ENUM ('OWNER', 'TENANT', 'RESIDENT');

-- CreateTable
CREATE TABLE "category_users" (
    "id" TEXT NOT NULL,
    "name" "UserApartmentType" NOT NULL,

    CONSTRAINT "category_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_apartments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryUserId" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,

    CONSTRAINT "users_apartments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_users_name_key" ON "category_users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_apartments_userId_apartmentId_categoryUserId_key" ON "users_apartments"("userId", "apartmentId", "categoryUserId");

-- AddForeignKey
ALTER TABLE "users_apartments" ADD CONSTRAINT "users_apartments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_apartments" ADD CONSTRAINT "users_apartments_categoryUserId_fkey" FOREIGN KEY ("categoryUserId") REFERENCES "category_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_apartments" ADD CONSTRAINT "users_apartments_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
