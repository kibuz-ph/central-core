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
      where: conditions,
    });

    if (!apartment) return null;

    return Apartment.fromPrisma(apartment);
  }

  async createMany(
    apartments: ApartmentProps[],
    tx?: Prisma.TransactionClient,
  ): Promise<Apartment[]> {
    const client = tx ?? this.prisma;
    const created = await client.apartment.createManyAndReturn({
      data: apartments,
    });

    return created.map(apartment => Apartment.fromPrisma(apartment));
  }

  async update(
    id: string,
    apartment: Partial<Apartment>,
    tx?: Prisma.TransactionClient,
  ): Promise<Apartment> {
    const client = tx ?? this.prisma;
    const updated = await client.apartment.update({
      where: { id },
      data: apartment,
    });

    return Apartment.fromPrisma(updated);
  }

  async delete(
    id: string,
    residentialComplexId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<boolean> {
    const client = tx ?? this.prisma;
    await client.apartment.update({
      where: { id, residentialComplexId },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
