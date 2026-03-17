import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Apartment, ApartmentProps } from '../../domain/entities/apartment.entity';
import { ApartmentRepositoryInterface } from '../../domain/repositories/apartment.repository-interface';

@Injectable()
export class ApartmentPrismaRepository implements ApartmentRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findByIdAndTowerId(
    id: string,
    towerId: string,
  ): Promise<Apartment | null> {
    const apartment = await this.prisma.apartment.findUnique({
      where: { id, towerId },
    });

    if (!apartment) return null;

    return Apartment.fromPrisma({
      ...apartment,
    });
  }

  async createMany(apartments: ApartmentProps[]): Promise<Apartment[]> {
    const apartmentsCreated = await this.prisma.apartment.createManyAndReturn({
      data: apartments,
    });

    return apartmentsCreated.map(apartment =>
      Apartment.fromPrisma({
        ...apartment,
      }),
    );
  }

  async update(id: string, towerId: string, apartment: Partial<Apartment>): Promise<Apartment> {
    const { ...updateData } = apartment;
    const apartmentUpdated = await this.prisma.apartment.update({
      where: { id, towerId },
      data: updateData,
    });
    return Apartment.fromPrisma({
      ...apartmentUpdated,
    });
  }

  async delete(id: string, towerId: string): Promise<boolean> {
    await this.prisma.apartment.delete({ where: { id, towerId } });
    return true;
  }
}
