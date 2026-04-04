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
    return CommonArea.fromPrisma(commonArea);
  }

  async findMany({
    conditions,
  }: {
    conditions: Prisma.CommonAreaWhereInput;
  }): Promise<CommonArea[]> {
    const commonAreas = await this.prisma.commonArea.findMany({ where: conditions });
    return commonAreas.map(ca => CommonArea.fromPrisma(ca));
  }

  async createMany(
    commonAreas: CommonAreaProps[],
    tx?: Prisma.TransactionClient,
  ): Promise<CommonArea[]> {
    const client = tx ?? this.prisma;
    const created = await client.commonArea.createManyAndReturn({ data: commonAreas });
    return created.map(ca => CommonArea.fromPrisma(ca));
  }

  async update(
    id: string,
    residentialComplexId: string,
    commonArea: Partial<CommonArea>,
    tx?: Prisma.TransactionClient,
  ): Promise<CommonArea> {
    const client = tx ?? this.prisma;
    const updated = await client.commonArea.update({
      where: { id, residentialComplexId },
      data: commonArea,
    });
    return CommonArea.fromPrisma(updated);
  }

  async delete(
    id: string,
    residentialComplexId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<boolean> {
    const client = tx ?? this.prisma;
    await client.commonArea.delete({ where: { id, residentialComplexId } });
    return true;
  }
}
