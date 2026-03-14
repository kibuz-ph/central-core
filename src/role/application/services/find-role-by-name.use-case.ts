import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../../domain/entities/role.entity';
import { RoleRepositoryInterface } from '../../domain/repositories/role.repository-interface';

@Injectable()
export class FindRoleByNameUseCase {
  constructor(
    @Inject('RoleRepositoryInterface')
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  async findByName(name: string): Promise<Role | null> {
    return this.roleRepository.findByName(name);
  }
}
