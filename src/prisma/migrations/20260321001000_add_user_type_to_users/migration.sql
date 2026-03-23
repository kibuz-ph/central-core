-- Create UserType enum
CREATE TYPE "UserType" AS ENUM ('KIBUZ', 'OTHER');

-- Add type column to users table with default OTHER
ALTER TABLE "users" ADD COLUMN "type" "UserType" NOT NULL DEFAULT 'OTHER';
