import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { UserDetail } from '../../domain/entities/user-detail.entity';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user-detail.repository-interface';

@Injectable()
export class CreateUserDetailUseCase {
  constructor(
    @Inject('UserDetailRepositoryInterface')
    private readonly userDetailRepository: UserDetailRepositoryInterface,
  ) {}

  async create(userDetail: UserDetail, tx?: Prisma.TransactionClient): Promise<UserDetail> {
    return this.userDetailRepository.create(userDetail, tx);
  }
}
