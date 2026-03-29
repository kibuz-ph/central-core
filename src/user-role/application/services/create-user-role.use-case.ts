import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { UserRole } from '../../domain/entities/user-role.entity';
import { UserRoleRepositoryInterface } from '../../domain/repositories/user-role.repository-interface';

@Injectable()
export class CreateUserRoleUseCase {
  constructor(
    @Inject('UserRoleRepositoryInterface')
    private readonly userRoleRepository: UserRoleRepositoryInterface,
  ) {}

  async create(userRole: UserRole, tx?: Prisma.TransactionClient): Promise<UserRole> {
    return this.userRoleRepository.create(userRole, tx);
  }
}
