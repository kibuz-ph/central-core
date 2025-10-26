import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../../prisma/prisma-client/client';
import { PrismaService } from '../../../../prisma/prisma.service';
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

    return ResidentialComplex.fromPrisma({
      ...residentialComplex,
      logo: residentialComplex.logo ?? undefined,
      primaryColor: residentialComplex.primaryColor ?? undefined,
      secondaryColor: residentialComplex.secondaryColor ?? undefined,
    });
  }

  async create(residentialComplex: ResidentialComplexProps): Promise<ResidentialComplex> {
    const { id: _id, ...residentialComplexData } = residentialComplex;
    const residentialComplexCreated = await this.prisma.residentialComplex.create({
      data: residentialComplexData,
    });
    return ResidentialComplex.fromPrisma({
      ...residentialComplexCreated,
      logo: residentialComplexCreated.logo ?? undefined,
      primaryColor: residentialComplexCreated.primaryColor ?? undefined,
      secondaryColor: residentialComplexCreated.secondaryColor ?? undefined,
    });
  }
}
