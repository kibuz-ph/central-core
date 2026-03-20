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
  
  async findMany({
    conditions,
  }: {
    conditions: Prisma.TowerWhereInput;
  }): Promise<Tower[]> {
    const towers = await this.prisma.tower.findMany({
      where: conditions,
    });

    if (!towers) return [];

    return towers.map(tower => Tower.fromPrisma(tower as TowerProps));
  }

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.TowerWhereInput;
  }): Promise<Tower | null> {
    const tower = await this.prisma.tower.findFirst({
      where: conditions
    });

    if (!tower) return null;

    return Tower.fromPrisma({
      ...tower,
      description: tower.description ?? undefined,
    });
  }

  async createMany(towers: TowerProps[]): Promise<Tower[]> {
    const towersCreated = await this.prisma.tower.createManyAndReturn({
      data: towers,
    });

    return towersCreated.map(tower =>
      Tower.fromPrisma({
        ...tower,
        description: tower.description ?? undefined,
      }),
    );
  }

  async update(id: string, residentialComplexId: string, tower: Partial<Tower>): Promise<Tower> {
    const { ...updateData } = tower;
    const towerUpdated = await this.prisma.tower.update({
      where: { id, residentialComplexId },
      data: updateData,
    });
    return Tower.fromPrisma({
      ...towerUpdated,
      description: tower.description ?? undefined,
    });
  }

  async delete(id: string, residentialComplexId: string): Promise<boolean> {
    await this.prisma.tower.delete({ where: { id, residentialComplexId } });
    return true;
  }
}
