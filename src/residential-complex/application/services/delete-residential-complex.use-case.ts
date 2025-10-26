import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ResidentialComplexInterface } from '../../domain/repositories/residential-complex.repository-interface';

@Injectable()
export class DeleteResidentialComplexUseCase {
  constructor(
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const residentialComplexExists = await this.residentialComplexInterface.findUnique({
      conditions: { id },
    });

    if (!residentialComplexExists) {
      throw new DomainException('Residential complex not found');
    }

    return this.residentialComplexInterface.delete(id);
  }
}
