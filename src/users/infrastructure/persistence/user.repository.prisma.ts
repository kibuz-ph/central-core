import { Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../../../common/dtos/pagination-query.dto';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { User, UserProps } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';

export class UserPrismaRepository implements UserRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findMany({
    conditions,
    paginationQueryDto,
  }: {
    conditions: Prisma.UserWhereInput;
    paginationQueryDto: PaginationQueryDto;
  }): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        userDetail: true,
      },
      where: conditions,
      take: paginationQueryDto.perPage,
      skip: paginationQueryDto.page,
    });

    return users.map(user => User.fromPrisma(user as UserProps));
  }

  async findUnique({ conditions }: { conditions: Prisma.UserWhereInput }): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      include: {
        userDetail: true,
      },
      where: conditions,
    });

    if (!user) return null;

    return User.fromPrisma(user as UserProps);
  }

  async create(user: User): Promise<User> {
    const { userDetail, ...userInfo } = user;
    const _userDetail = userDetail;
    const createdUser = await this.prisma.user.create({
      data: {
        ...userInfo,
        password: user.getPassword(),
      },
    });

    return User.fromPrisma(createdUser);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const { userDetail, ...userInfo } = user;
    const _userDetail = userDetail;
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...userInfo },
    });

    return User.fromPrisma(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
    return true;
  }
}
