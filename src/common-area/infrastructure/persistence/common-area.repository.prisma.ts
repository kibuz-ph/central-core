import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { CommonArea, CommonAreaProps } from '../../domain/entities/common-area.entity';
import { CommonAreaRepositoryInterface } from '../../domain/repositories/common-area.repository-interface';

@Injectable()
export class CommonAreaPrismaRepository implements CommonAreaRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.CommonAreaWhereInput;
  }): Promise<CommonArea | null> {
    const commonArea = await this.prisma.commonArea.findFirst({ where: conditions });
    if (!commonArea) return null;
    return CommonArea.fromPrisma({
      ...commonArea,
      icon: commonArea.icon ?? undefined,
      description: commonArea.description ?? undefined,
    });
  }

  async findMany({
    conditions,
  }: {
    conditions: Prisma.CommonAreaWhereInput;
  }): Promise<CommonArea[]> {
    const commonAreas = await this.prisma.commonArea.findMany({ where: conditions });
    return commonAreas.map(ca =>
      CommonArea.fromPrisma({
        ...ca,
        icon: ca.icon ?? undefined,
        description: ca.description ?? undefined,
      }),
    );
  }

  async createMany(commonAreas: CommonAreaProps[]): Promise<CommonArea[]> {
    const created = await this.prisma.commonArea.createManyAndReturn({ data: commonAreas });
    return created.map(ca =>
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
    const updated = await this.prisma.commonArea.update({
      where: { id, residentialComplexId },
      data: commonArea,
    });
    return CommonArea.fromPrisma({
      ...updated,
      icon: updated.icon ?? undefined,
      description: updated.description ?? undefined,
    });
  }

  async delete(id: string, residentialComplexId: string): Promise<boolean> {
    await this.prisma.commonArea.delete({ where: { id, residentialComplexId } });
    return true;
  }
}
