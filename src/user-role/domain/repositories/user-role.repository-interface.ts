import { Prisma } from '../../../prisma/prisma-client/client';
import { UserRole } from '../entities/user-role.entity';

export interface UserRoleRepositoryInterface {
  findUnique({ conditions }: { conditions: unknown }): Promise<UserRole | null>;
  findFirst({ conditions }: { conditions: unknown }): Promise<UserRole | null>;
  findMany({ conditions }: { conditions: unknown }): Promise<UserRole[]>;
  create(userRole: UserRole, tx?: Prisma.TransactionClient): Promise<UserRole>;
  delete(id: string): Promise<void>;
}
