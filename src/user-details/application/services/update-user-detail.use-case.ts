import { Inject, Injectable } from '@nestjs/common';
import { UserDetail } from '../../domain/entities/user_detail.entity';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user_detail.repository-interface';

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
