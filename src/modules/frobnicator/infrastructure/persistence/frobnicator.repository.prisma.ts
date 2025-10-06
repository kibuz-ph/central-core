import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import type { Frobnicator } from '../../domain/entities/frobnicator.entity';
import type { FrobnicatorRepositoryInterface } from '../../domain/repositories/frobnicator.repository-interface';

@Injectable()
export class FrobnicatorPrismaResipository implements FrobnicatorRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async save(frobnicator: Frobnicator): Promise<Frobnicator> {
    return this.prisma.frobnicator.create({ data: frobnicator });
  }

  async findById(id: string): Promise<Frobnicator | null> {
    return this.prisma.frobnicator.findUnique({ where: { id } });
  }

  async findAll(): Promise<Frobnicator[]> {
    return this.prisma.frobnicator.findMany();
  }

  async findPaginated(page: number, perPage: number): Promise<Frobnicator[]> {
    const skip = (page - 1) * perPage;
    return this.prisma.frobnicator.findMany({
      skip,
      take: Number(perPage),
    });
  }

  async count(): Promise<number> {
    return this.prisma.frobnicator.count();
  }
}
