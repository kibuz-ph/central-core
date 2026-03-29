import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Tower, TowerProps } from '../../domain/entities/tower.entity';
import { TowerRepositoryInterface } from '../../domain/repositories/tower.repository-interface';

@Injectable()
export class TowerPrismaRepository implements TowerRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findMany({ conditions }: { conditions: Prisma.TowerWhereInput }): Promise<Tower[]> {
    const towers = await this.prisma.tower.findMany({ where: conditions });
    if (!towers) return [];
    return towers.map(tower => Tower.fromPrisma(tower));
  }

  async findUnique({ conditions }: { conditions: Prisma.TowerWhereInput }): Promise<Tower | null> {
    const tower = await this.prisma.tower.findFirst({ where: conditions });
    if (!tower) return null;
    return Tower.fromPrisma(tower);
  }

  async createMany(towers: TowerProps[], tx?: Prisma.TransactionClient): Promise<Tower[]> {
    const client = tx ?? this.prisma;
    const created = await client.tower.createManyAndReturn({ data: towers });
    return created.map(tower => Tower.fromPrisma(tower));
  }

  async update(
    id: string,
    residentialComplexId: string,
    tower: Partial<Tower>,
    tx?: Prisma.TransactionClient,
  ): Promise<Tower> {
    const client = tx ?? this.prisma;
    const updated = await client.tower.update({
      where: { id, residentialComplexId },
      data: tower,
    });
    return Tower.fromPrisma(updated);
  }

  async delete(
    id: string,
    residentialComplexId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<boolean> {
    const client = tx ?? this.prisma;
    await client.tower.update({
      where: { id, residentialComplexId },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
