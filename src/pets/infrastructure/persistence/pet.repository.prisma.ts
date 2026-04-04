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

  async findMany({ conditions }: { conditions: Prisma.PetWhereInput }): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({ where: conditions });
    return pets.map(pet => Pet.fromPrisma(pet));
  }

  async createMany(pets: PetProps[], tx?: Prisma.TransactionClient): Promise<Pet[]> {
    const client = tx ?? this.prisma;
    const created = await client.pet.createManyAndReturn({ data: pets });
    return created.map(pet => Pet.fromPrisma(pet));
  }

  async update(id: string, pet: Partial<Pet>, tx?: Prisma.TransactionClient): Promise<Pet> {
    const client = tx ?? this.prisma;
    const updated = await client.pet.update({ where: { id }, data: pet });
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
