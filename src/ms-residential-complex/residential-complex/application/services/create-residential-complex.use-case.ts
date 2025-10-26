import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { generateSlug } from '../../../../common/utils/slug-generator.util';
import { DomainException } from '../../../../modules/pino/domain/exceptions/domain.exception';
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
    const residentialComplexExists = await this.residentialComplexInterface.findUnique({
      conditions: { slug },
    });

    if (residentialComplexExists) {
      throw new DomainException({
        message: `Residential Complex with name: ${createResidentialComplexDto.name} already exists`,
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const residentialComplexCreated = await this.residentialComplexInterface.create({
      ...createResidentialComplexDto,
      slug,
      isActive: true,
    });

    return ResidentialComplexResponseDto.fromEntities(residentialComplexCreated);
  }
}
