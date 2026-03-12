import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  Tower,
  TowerProps,
} from '../../domain/entities/tower.entity';
import { TowerRepositoryInterface } from '../../domain/repositories/tower.repository-interface';

@Injectable()
export class TowerPrismaRepository implements TowerRepositoryInterface {
    constructor(
        @Inject(PrismaService)
        private readonly prisma: PrismaService,
    ) {}

    async findByIdAndResidentialComplexId(
      id: string,
      residentialComplexId: string,
    ): Promise<Tower | null> {
      const tower = await this.prisma.tower.findUnique({
        where: { id, residentialComplexId },
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

    async update(
      id: string,
      residentialComplexId: string,
      tower: Partial<Tower>,
    ): Promise<Tower> {
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