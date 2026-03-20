import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Apartment, ApartmentProps } from '../../domain/entities/apartment.entity';
import { ApartmentRepositoryInterface } from '../../domain/repositories/apartment.repository-interface';

@Injectable()
export class ApartmentPrismaRepository implements ApartmentRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({
    conditions,
  }: {
    conditions: Prisma.ApartmentWhereInput;
  }): Promise<Apartment | null> {
    const apartment = await this.prisma.apartment.findFirst({
      where: conditions
    });

    if (!apartment) return null;

    return Apartment.fromPrisma({
      ...apartment,
      towerId: apartment.towerId ?? undefined,
    });
  }

  async createMany(apartments: ApartmentProps[]): Promise<Apartment[]> {
    const apartmentsCreated = await this.prisma.apartment.createManyAndReturn({
      data: apartments,
    });

    return apartmentsCreated.map(apartment =>
      Apartment.fromPrisma({
        ...apartment,
        towerId: apartment.towerId ?? undefined,
      }),
    );
  }

  async update(id: string, apartment: Partial<Apartment>): Promise<Apartment> {
    const { ...updateData } = apartment;
    const apartmentUpdated = await this.prisma.apartment.update({
      where: { id },
      data: updateData,
    });
    
    return Apartment.fromPrisma({
      ...apartmentUpdated,
      towerId: apartment.towerId ?? undefined,
    });
  }

  async delete(id: string, residentialComplexId: string): Promise<boolean> {
    await this.prisma.apartment.delete({ where: { id, residentialComplexId } });
    return true;
  }
}
