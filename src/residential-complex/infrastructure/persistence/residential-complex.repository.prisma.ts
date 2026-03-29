import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  ResidentialComplex,
  ResidentialComplexProps,
} from '../../domain/entities/residential-complex.entity';
import { ResidentialComplexInterface } from '../../domain/repositories/residential-complex.repository-interface';

@Injectable()
export class ResidentialComplexPrismaRepository implements ResidentialComplexInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.ResidentialComplexWhereInput;
  }): Promise<ResidentialComplex | null> {
    const residentialComplex = await this.prisma.residentialComplex.findFirst({
      where: conditions,
    });

    if (!residentialComplex) return null;

    return ResidentialComplex.fromPrisma(residentialComplex);
  }

  async findManyByUserId(userId: string): Promise<ResidentialComplex[]> {
    const results = await this.prisma.residentialComplex.findMany({
      where: {
        userRoles: { some: { userId } },
      },
    });

    return results.map(rc => ResidentialComplex.fromPrisma(rc));
  }

  async create(
    residentialComplex: ResidentialComplexProps,
    tx?: Prisma.TransactionClient,
  ): Promise<ResidentialComplex> {
    const client = tx ?? this.prisma;
    const { id: _id, ...residentialComplexData } = residentialComplex;
    const residentialComplexCreated = await client.residentialComplex.create({
      data: residentialComplexData,
    });
    return ResidentialComplex.fromPrisma(residentialComplexCreated);
  }

  async update(
    id: string,
    residentialComplex: Partial<ResidentialComplex>,
    tx?: Prisma.TransactionClient,
  ): Promise<ResidentialComplex> {
    const client = tx ?? this.prisma;
    const residentialComplexUpdated = await client.residentialComplex.update({
      where: { id },
      data: residentialComplex,
    });
    return ResidentialComplex.fromPrisma(residentialComplexUpdated);
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<boolean> {
    const client = tx ?? this.prisma;
    await client.residentialComplex.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
    return true;
  }
}
