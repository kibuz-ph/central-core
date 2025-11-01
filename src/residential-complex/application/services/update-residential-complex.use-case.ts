import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { generateSlug } from '../../../common/utils/slug-generator.util';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { ResidentialComplexInterface } from '../../domain/repositories/residential-complex.repository-interface';
import { ResidentialComplexResponseDto } from '../dto/residential-complex-response.dto';
import { UpdateResidentialComplexDto } from '../dto/update-residential-complex.dto';

interface DataToUpdateProps extends UpdateResidentialComplexDto {
  slug?: string;
}

@Injectable()
export class UpdateResidentialComplexUseCase {
  constructor(
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
  ) {}

  async execute(
    id: string,
    updateResidentialComplex: UpdateResidentialComplexDto,
  ): Promise<ResidentialComplexResponseDto> {
    const residentialComplexExists = await this.residentialComplexInterface.findUnique({
      conditions: { id },
    });

    if (!residentialComplexExists) {
      throw new DomainException('Residential complex not found');
    }
    // If name is being updated, regenerate the slug
    const dataToUpdate: DataToUpdateProps = updateResidentialComplex.name
      ? {
          ...updateResidentialComplex,
          slug: generateSlug(updateResidentialComplex.name),
        }
      : updateResidentialComplex;

    if (dataToUpdate?.slug) {
      const residentialComplexExists = await this.residentialComplexInterface.findUnique({
        conditions: { slug: dataToUpdate?.slug },
      });

      if (residentialComplexExists) {
        throw new DomainException({
          message: `Residential Complex with name: ${updateResidentialComplex.name} already exists`,
          statusCode: HttpStatus.CONFLICT,
        });
      }
    }

    const residentialComplex = await this.residentialComplexInterface.update(id, dataToUpdate);
    return ResidentialComplexResponseDto.fromEntities(residentialComplex);
  }
}
