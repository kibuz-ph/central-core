import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { ResidentialComplexResponseDto } from '../residential-complex/application/dto/residential-complex-response.dto';
import { FindResidentialComplexUseCase } from '../residential-complex/application/services/find-residential-complex.use-case';

@Controller('residential-complexes')
export class ResidentialComplexController {
  constructor(private readonly findResidentialComplexUseCase: FindResidentialComplexUseCase) {}

  @Get('/:slug')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @EndpointSwaggerDecorator({
    summary: 'Login user and return token',
    responseType: ResidentialComplexResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Residential complex not found',
      },
    ],
    requireAuth: false,
  })
  async getResidentialComplex(@Param('slug') slug: string): Promise<ResidentialComplexResponseDto> {
    return this.findResidentialComplexUseCase.executeBySlug(slug);
  }
}
