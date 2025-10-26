import { Inject, Injectable } from '@nestjs/common';
import { generateSlug } from '../../../../common/utils/slug-generator.util';
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
    const slug = generateSlug(createResidentialComplexDto.name);

    const residentialComplexCreated = await this.residentialComplexInterface.create({
      ...createResidentialComplexDto,
      slug,
      isActive: true,
    });

    return ResidentialComplexResponseDto.fromEntities(residentialComplexCreated);
  }
}
