-- Rename SUPER_ADMIN value to MASTER
ALTER TYPE "user_role_types" RENAME VALUE 'SUPER_ADMIN' TO 'MASTER';

-- Rename enum type from user_role_types to UserRoleType
ALTER TYPE "user_role_types" RENAME TO "UserRoleType";
