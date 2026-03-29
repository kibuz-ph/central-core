import { Inject } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserDetail, UserDetailProps } from '../../domain/entities/user-detail.entity';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user-detail.repository-interface';

export class UserDetailPrismaRepository implements UserDetailRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.userDetailWhereInput;
  }): Promise<UserDetail | null> {
    const userDetail = await this.prisma.userDetail.findFirst({
      where: conditions,
    });

    if (!userDetail) return null;

    return UserDetail.fromPrisma(userDetail as UserDetailProps);
  }

  async create(userDetail: UserDetail, tx?: Prisma.TransactionClient): Promise<UserDetail> {
    const client = tx ?? this.prisma;
    const createUserDetail = await client.userDetail.create({
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
