import { Inject, Injectable } from '@nestjs/common';
import { Frobnicator } from '../../domain/entities/frobnicator.entity';
import { FrobnicatorRepositoryInterface } from '../../domain/repositories/frobnicator.repository-interface';

@Injectable()
export class CreateFrobnicatorUseCase {
  constructor(
    @Inject('FrobnicatorRepositoryInterface')
    private readonly frobnicatorRespository: FrobnicatorRepositoryInterface,
  ) {}

  async execute(name: string, description: string) {
    const frobnicator = new Frobnicator(Date.now().toString(), name, description);
    return this.frobnicatorRespository.save(frobnicator);
  }
}
