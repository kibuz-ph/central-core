import { Inject, Injectable } from '@nestjs/common';
import { UserDetail } from '../../domain/entities/user-detail.entity';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user-detail.repository-interface';

@Injectable()
export class UpdateUserDetailUseCase {
  constructor(
    @Inject('UserDetailRepositoryInterface')
    private readonly userDetailRepository: UserDetailRepositoryInterface,
  ) {}

  async update(id: string, userDetail: Partial<UserDetail>): Promise<UserDetail> {
    const userDetailUpdated = await this.userDetailRepository.update(id, userDetail);

    return userDetailUpdated;
  }
}
