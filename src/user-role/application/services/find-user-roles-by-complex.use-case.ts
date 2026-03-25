import { Inject, Injectable } from '@nestjs/common';
import { UserRoleRepositoryInterface } from '../../domain/repositories/user-role.repository-interface';
import { UserRoleResponseDto } from '../dto/user-role-response.dto';

@Injectable()
export class FindUserRolesByComplexUseCase {
  constructor(
    @Inject('UserRoleRepositoryInterface')
    private readonly userRoleRepository: UserRoleRepositoryInterface,
  ) {}

  async execute(userId: string, residentialComplexId: string): Promise<UserRoleResponseDto[]> {
    const userRoles = await this.userRoleRepository.findMany({
      conditions: { userId, residentialComplexId },
    });
    return userRoles.map(ur => UserRoleResponseDto.fromEntity(ur));
  }
}
