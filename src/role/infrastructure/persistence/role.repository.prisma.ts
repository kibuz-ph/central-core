import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Role, RoleProps } from '../../domain/entities/role.entity';
import { RoleRepositoryInterface } from '../../domain/repositories/role.repository-interface';

export class RolePrismaRepository implements RoleRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findByName(name: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: { name: name as Role['name'] },
    });

    if (!role) return null;

    return Role.fromPrisma(role as RoleProps);
  }
}
