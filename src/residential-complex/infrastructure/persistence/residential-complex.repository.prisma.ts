import { Inject, Injectable } from '@nestjs/common';
import { CommonArea } from '../../../common-area/domain/entities/common-area.entity';
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
      include: { commonAreas: true },
    });

    if (!residentialComplex) return null;

    return ResidentialComplex.fromPrisma({
      ...residentialComplex,
      logo: residentialComplex.logo ?? undefined,
      primaryColor: residentialComplex.primaryColor ?? undefined,
      secondaryColor: residentialComplex.secondaryColor ?? undefined,
      commonAreas: residentialComplex.commonAreas?.map(area =>
        CommonArea.fromPrisma({
          ...area,
          icon: area.icon ?? undefined,
          description: area.description ?? undefined,
        }),
      ),
    });
  }

  async create(residentialComplex: ResidentialComplexProps): Promise<ResidentialComplex> {
    const { id: _id, commonAreas: _commonAreas, ...residentialComplexData } = residentialComplex;
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

  async update(
    id: string,
    residentialComplex: Partial<ResidentialComplex>,
  ): Promise<ResidentialComplex> {
    const { commonAreas: _commonAreas, ...updateData } = residentialComplex;
    const residentialComplexUpdated = await this.prisma.residentialComplex.update({
      where: { id },
      data: updateData,
    });
    return ResidentialComplex.fromPrisma({
      ...residentialComplexUpdated,
      logo: residentialComplexUpdated.logo ?? undefined,
      primaryColor: residentialComplexUpdated.primaryColor ?? undefined,
      secondaryColor: residentialComplexUpdated.secondaryColor ?? undefined,
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.residentialComplex.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });
    return true;
  }
}
