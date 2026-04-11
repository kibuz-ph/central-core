import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '../../../prisma/prisma-client/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { Pet, PetProps } from '../../domain/entities/pet.entity';
import { PetRepositoryInterface } from '../../domain/repositories/pet.repository-interface';

@Injectable()
export class PetPrismaRepository implements PetRepositoryInterface {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async findUnique({ conditions }: { conditions: Prisma.PetWhereInput }): Promise<Pet | null> {
    const pet = await this.prisma.pet.findFirst({
      where: { ...conditions, deletedAt: null },
    });
    if (!pet) return null;
    return Pet.fromPrisma(pet);
  }

  async findMany({
    conditions,
    include,
    page,
    perPage,
  }: {
    conditions: Prisma.PetWhereInput;
    include?: Prisma.PetInclude;
    page?: number;
    perPage?: number;
  }): Promise<Pet[]> {
    const skip = page && perPage ? (page - 1) * perPage : undefined;
    const pets = await this.prisma.pet.findMany({
      where: conditions,
      include,
      skip,
      take: perPage,
    });
    return pets.map(pet => Pet.fromPrisma(pet as PetProps));
  }

  async count(conditions: Prisma.PetWhereInput): Promise<number> {
    return this.prisma.pet.count({ where: conditions });
  }

  async createMany(pets: PetProps[], tx?: Prisma.TransactionClient): Promise<Pet[]> {
    const client = tx ?? this.prisma;
    const created = await client.pet.createManyAndReturn({ data: pets });
    return created.map(pet => Pet.fromPrisma(pet));
  }

  async update(id: string, pet: Partial<Pet>, tx?: Prisma.TransactionClient): Promise<Pet> {
    const client = tx ?? this.prisma;
    const updated = await client.pet.update({ where: { id }, data: pet as Prisma.PetUpdateInput });
    return Pet.fromPrisma(updated);
  }

  async delete(id: string, apartmentId: string, tx?: Prisma.TransactionClient): Promise<boolean> {
    const client = tx ?? this.prisma;
    await client.pet.update({
      where: { id, apartmentId },
      data: { deletedAt: new Date() },
    });
    return true;
  }
}
