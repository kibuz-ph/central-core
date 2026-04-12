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
