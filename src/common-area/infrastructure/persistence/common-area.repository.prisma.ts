import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CommonArea, CommonAreaProps } from '../../domain/entities/common-area.entity';
import { CommonAreaRepositoryInterface } from '../../domain/repositories/common-area.repository-interface';

@Injectable()
export class CommonAreaPrismaRepository implements CommonAreaRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findByIdAndResidentialComplexId(
    id: string,
    residentialComplexId: string,
  ): Promise<CommonArea | null> {
    const commonArea = await this.prisma.commonArea.findUnique({
      where: { id, residentialComplexId },
    });
    if (!commonArea) return null;

    return CommonArea.fromPrisma({
      ...commonArea,
      icon: commonArea.icon ?? undefined,
      description: commonArea.description ?? undefined,
    });
  }

  async createMany(commonAreas: CommonAreaProps[]): Promise<CommonArea[]> {
    const commonAreasCreated = await this.prisma.commonArea.createManyAndReturn({
      data: commonAreas,
    });

    return commonAreasCreated.map(ca =>
      CommonArea.fromPrisma({
        ...ca,
        icon: ca.icon ?? undefined,
        description: ca.description ?? undefined,
      }),
    );
  }

  async update(
    id: string,
    residentialComplexId: string,
    commonArea: Partial<CommonArea>,
  ): Promise<CommonArea> {
    const commonAreaUpdated = await this.prisma.commonArea.update({
      where: { id, residentialComplexId },
      data: commonArea,
    });

    return CommonArea.fromPrisma({
      ...commonAreaUpdated,
      icon: commonAreaUpdated.icon ?? undefined,
      description: commonAreaUpdated.description ?? undefined,
    });
  }

  async delete(id: string, residentialComplexId: string): Promise<boolean> {
    await this.prisma.commonArea.delete({ where: { id, residentialComplexId } });
    return true;
  }
}
