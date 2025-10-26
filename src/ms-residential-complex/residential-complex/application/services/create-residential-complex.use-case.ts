import { Inject, Injectable } from '@nestjs/common';
import { ResidentialComplexInterface } from '../../domain/repositories/residential-complex.repository-interface';
import { CreateResidentialComplexDto } from '../dto/create-residential-complex.dto';
import { ResidentialComplexResponseDto } from '../dto/residential-complex-response.dto';

@Injectable()
export class CreateResidentialComplexUseCase {
  constructor(
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
  ) {}

  async execute(
    createResidentialComplexDto: CreateResidentialComplexDto,
  ): Promise<ResidentialComplexResponseDto> {
    const residentialComplexCreated = await this.residentialComplexInterface.create({
      ...createResidentialComplexDto,
      isActive: true,
    });

    return ResidentialComplexResponseDto.fromEntities(residentialComplexCreated);
  }
}
