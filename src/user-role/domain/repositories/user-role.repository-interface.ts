import { UserRole } from '../entities/user-role.entity';

export interface UserRoleRepositoryInterface {
  findUnique({ conditions }: { conditions: unknown }): Promise<UserRole | null>;
  create(userRole: UserRole): Promise<UserRole>;
  delete(id: string): Promise<void>;
}
