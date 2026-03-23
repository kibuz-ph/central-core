import { Inject } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserRole } from '../../domain/entities/user-role.entity';
import { UserRoleRepositoryInterface } from '../../domain/repositories/user-role.repository-interface';

export class UserRolePrismaRepository implements UserRoleRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.UserRoleWhereUniqueInput;
  }): Promise<UserRole | null> {
    const userRole = await this.prisma.userRole.findUnique({
      where: conditions,
    });

    if (!userRole) return null;

    return UserRole.fromPrisma(userRole);
  }

  async findFirst({
    conditions,
  }: {
    conditions: Prisma.UserRoleWhereInput;
  }): Promise<UserRole | null> {
    const userRole = await this.prisma.userRole.findFirst({
      where: conditions,
    });

    if (!userRole) return null;

    return UserRole.fromPrisma(userRole);
  }

  async create(userRole: UserRole): Promise<UserRole> {
    const created = await this.prisma.userRole.create({
      data: userRole,
    });

    return UserRole.fromPrisma(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userRole.delete({
      where: { id },
    });
  }
}
