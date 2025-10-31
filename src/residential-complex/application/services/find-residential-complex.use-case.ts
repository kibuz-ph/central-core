import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ResidentialComplexInterface } from '../../domain/repositories/residential-complex.repository-interface';
import { ResidentialComplexResponseDto } from '../dto/residential-complex-response.dto';

@Injectable()
export class FindResidentialComplexUseCase {
  constructor(
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
  ) {}

  async executeById(id: string): Promise<ResidentialComplexResponseDto> {
    const residentialComplex = await this.residentialComplexInterface.findUnique({
      conditions: { id },
    });

    if (!residentialComplex) {
      throw new DomainException(`Residential complex ${id} not found`);
    }
    return ResidentialComplexResponseDto.fromEntities(residentialComplex);
  }

  async executeBySlug(slug: string): Promise<ResidentialComplexResponseDto> {
    const residentialComplex = await this.residentialComplexInterface.findUnique({
      conditions: { slug },
    });

    if (!residentialComplex) {
      throw new DomainException(`Residential complex ${slug} not found`);
    }
    console.log('residentialComplex', residentialComplex);
    return ResidentialComplexResponseDto.fromEntities(residentialComplex);
  }
}
