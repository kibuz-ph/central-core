import { Inject, Injectable } from '@nestjs/common';
import { UserRoleRepositoryInterface } from '../../domain/repositories/user-role.repository-interface';

@Injectable()
export class DeleteUserRoleUseCase {
  constructor(
    @Inject('UserRoleRepositoryInterface')
    private readonly userRoleRepository: UserRoleRepositoryInterface,
  ) {}

  async delete(id: string): Promise<void> {
    return this.userRoleRepository.delete(id);
  }
}
