import { Inject, Injectable } from '@nestjs/common';
import { UserDetail } from '../../domain/entities/user_detail.entity';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user_detail.repository-interface';

@Injectable()
export class CreateUserDetailUseCase {
  constructor(
    @Inject('UserDetailRepositoryInterface')
    private readonly userDetailRepository: UserDetailRepositoryInterface,
  ) {}

  async create(userDetail: UserDetail): Promise<UserDetail> {
    const userDetailCreated = await this.userDetailRepository.create(userDetail);

    return userDetailCreated;
  }
}
