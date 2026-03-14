import { Role } from '../entities/role.entity';

export interface RoleRepositoryInterface {
  findByName(name: string): Promise<Role | null>;
}
