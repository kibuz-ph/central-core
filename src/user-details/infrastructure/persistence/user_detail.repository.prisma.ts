import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserDetail } from '../../domain/entities/user_detail.entity';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user_detail.repository-interface';

export class UserDetailPrismaRepository implements UserDetailRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async create(userDetail: UserDetail): Promise<UserDetail> {
    const createUserDetail = await this.prisma.userDetail.create({
      data: userDetail,
    });

    return UserDetail.fromPrisma(createUserDetail as UserDetail);
  }

  async update(id: string, userDetail: Partial<UserDetail>): Promise<UserDetail> {
    const updateUserDetail = await this.prisma.userDetail.update({
      where: { userId: id },
      data: userDetail,
    });

    return UserDetail.fromPrisma(updateUserDetail as UserDetail);
  }
}
