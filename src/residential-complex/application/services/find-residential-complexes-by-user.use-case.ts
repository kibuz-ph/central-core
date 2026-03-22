import { Inject, Injectable } from '@nestjs/common';
import { ResidentialComplexInterface } from '../../domain/repositories/residential-complex.repository-interface';
import { ResidentialComplexResponseDto } from '../dto/residential-complex-response.dto';

@Injectable()
export class FindResidentialComplexesByUserUseCase {
  constructor(
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
  ) {}

  async execute(userId: string): Promise<ResidentialComplexResponseDto[]> {
    const residentialComplexes = await this.residentialComplexInterface.findManyByUserId(userId);
    return residentialComplexes.map(rc => ResidentialComplexResponseDto.fromEntities(rc));
  }
}
