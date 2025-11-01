-- DropEnum
DROP TYPE "public"."Role";

-- RenameIndex
ALTER INDEX "users_details_email_key" RENAME TO "user_details_email_key";

-- RenameIndex
ALTER INDEX "users_details_phone_key" RENAME TO "user_details_phone_key";

-- RenameIndex
ALTER INDEX "users_details_userId_key" RENAME TO "user_details_userId_key";
