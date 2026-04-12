import { Inject } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserApartment } from '../../domain/entities/user-apartment.entity';
import { UserApartmentRepositoryInterface } from '../../domain/repositories/user-apartment.repository-interface';

export class UserApartmentPrismaRepository implements UserApartmentRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.UserApartmentWhereUniqueInput;
  }): Promise<UserApartment | null> {
    const userApartment = await this.prisma.userApartment.findUnique({
      where: conditions,
    });

    if (!userApartment) return null;

    return UserApartment.fromPrisma(userApartment);
  }

  async findMany({
    conditions,
  }: {
    conditions: Prisma.UserApartmentWhereInput;
  }): Promise<UserApartment[]> {
    const userApartments = await this.prisma.userApartment.findMany({
      where: conditions,
      include: { categoryUser: true, user: true, apartment: true },
    });

    return userApartments.map(ua =>
      UserApartment.fromPrisma({
        id: ua.id,
        userId: ua.userId,
        categoryUserId: ua.categoryUserId,
        apartmentId: ua.apartmentId,
        categoryUserName: ua.categoryUser.name,
        user: ua.user,
        apartment: ua.apartment,
      }),
    );
  }

  async findManyByResidentialComplex(
    where: Prisma.UserApartmentWhereInput,
    skip: number,
    take: number,
  ): Promise<UserApartment[]> {
    const paginatedUsers = await this.prisma.userApartment.findMany({
      where,
      distinct: ['userId'],
      select: { userId: true },
      skip,
      take,
    });

    const userIds = paginatedUsers.map(u => u.userId);
    if (!userIds.length) return [];

    const residentialComplexId = (where.apartment as Prisma.ApartmentWhereInput | undefined)
      ?.residentialComplexId as string | undefined;

    const userApartments = await this.prisma.userApartment.findMany({
      where: {
        userId: { in: userIds },
        ...(residentialComplexId && { apartment: { residentialComplexId } }),
      },
      include: {
        categoryUser: true,
        user: { include: { userDetail: true } },
        apartment: true,
      },
    });

    return userApartments.map(ua =>
      UserApartment.fromPrisma({
        id: ua.id,
        userId: ua.userId,
        categoryUserId: ua.categoryUserId,
        apartmentId: ua.apartmentId,
        categoryUserName: ua.categoryUser.name,
        user: {
          ...ua.user,
          userDetail: ua.user.userDetail
            ? {
                ...ua.user.userDetail,
                secondName: ua.user.userDetail.secondName ?? undefined,
                secondLastName: ua.user.userDetail.secondLastName ?? undefined,
              }
            : undefined,
        },
        apartment: ua.apartment,
      }),
    );
  }
  async countUsersByResidentialComplex(where: Prisma.UserApartmentWhereInput): Promise<number> {
    const result = await this.prisma.userApartment.findMany({
      where,
      distinct: ['userId'],
      select: { userId: true },
    });
    return result.length;
  }

  async create(
    userApartment: UserApartment,
    tx?: Prisma.TransactionClient,
  ): Promise<UserApartment> {
    const client = tx ?? this.prisma;
    const created = await client.userApartment.create({
      data: {
        userId: userApartment.userId,
        categoryUserId: userApartment.categoryUserId,
        apartmentId: userApartment.apartmentId,
      },
    });

    return UserApartment.fromPrisma(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userApartment.delete({
      where: { id },
    });
  }
}
