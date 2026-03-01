import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { CommonAreaResponseDto } from '../../common-area/application/dto/common-area-response.dto';
import { CreateCommonAreasDto } from '../../common-area/application/dto/create-common-areas.dto';
import { UpdateCommonAreaDto } from '../../common-area/application/dto/update-common-area.dto';
import { CreateCommonAreaUseCase } from '../../common-area/application/services/create-common-area.use-case';
import { DeleteCommonAreaUseCase } from '../../common-area/application/services/delete-common-area.use-case';
import { GetCommonAreaUseCase } from '../../common-area/application/services/get-common-area.use-case';
import { UpdateCommonAreaUseCase } from '../../common-area/application/services/update-common-area.use-case';
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { WrapResponse } from '../../common/decorators/wrap-response.decorator';
import { createBaseResponse, createDataResponse } from '../../common/dtos/base-response.dto';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { CreateResidentialComplexDto } from '../application/dto/create-residential-complex.dto';
import { ResidentialComplexResponseDto } from '../application/dto/residential-complex-response.dto';
import { UpdateResidentialComplexDto } from '../application/dto/update-residential-complex.dto';
import { CreateResidentialComplexUseCase } from '../application/services/create-residential-complex.use-case';
import { DeleteResidentialComplexUseCase } from '../application/services/delete-residential-complex.use-case';
import { FindResidentialComplexUseCase } from '../application/services/find-residential-complex.use-case';
import { UpdateResidentialComplexUseCase } from '../application/services/update-residential-complex.use-case';

@Controller('residential-complexes')
@UseInterceptors(ResponseWrapperInterceptor)
export class ResidentialComplexController {
  constructor(
    private readonly findResidentialComplexUseCase: FindResidentialComplexUseCase,
    private readonly createResidentialComplexUseCase: CreateResidentialComplexUseCase,
    private readonly updateResidentialComplexUseCase: UpdateResidentialComplexUseCase,
    private readonly deleteResidentialComplexUseCase: DeleteResidentialComplexUseCase,
    private readonly createCommonAreaUseCase: CreateCommonAreaUseCase,
    private readonly getCommonAreaUseCase: GetCommonAreaUseCase,
    private readonly deleteCommonAreaUseCase: DeleteCommonAreaUseCase,
    private readonly updateCommonAreaUseCase: UpdateCommonAreaUseCase,
  ) {}

  @Get('/:id/common-areas/:commonAreaId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Common Area retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's common area",
    responseType: createDataResponse(
      CommonAreaResponseDto,
      "Residential complex's common area retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Common Area not found',
      },
    ],
    requireAuth: true,
  })
  async getCommonAreaById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('commonAreaId', new ParseUUIDPipe()) commonAreaId: string,
  ): Promise<CommonAreaResponseDto> {
    return this.getCommonAreaUseCase.execute(id, commonAreaId);
  }

  @Delete('/:id/common-areas/:commonAreaId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common Area deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a common area',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Common Area not found',
      },
    ],
    requireAuth: true,
  })
  async deleteCommonArea(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('commonAreaId', new ParseUUIDPipe()) commonAreaId: string,
  ): Promise<boolean> {
    return this.deleteCommonAreaUseCase.execute(id, commonAreaId);
  }

  @Patch('/:id/common-areas/:commonAreaId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common Area updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Updated a common area',
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Common Area not found',
      },
    ],
    requireAuth: true,
  })
  async updateCommonArea(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('commonAreaId', new ParseUUIDPipe()) commonAreaId: string,
    @Body() updateCommonAreaDto: UpdateCommonAreaDto,
  ): Promise<boolean> {
    return this.updateCommonAreaUseCase.execute(id, commonAreaId, updateCommonAreaDto);
  }

  @Get('/:slug')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Residential complex retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: 'Get residential complex by slug',
    responseType: createDataResponse(
      ResidentialComplexResponseDto,
      'Residential complex retrieved successfully',
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Residential complex not found',
      },
    ],
    requireAuth: true,
  })
  async getResidentialComplex(@Param('slug') slug: string): Promise<ResidentialComplexResponseDto> {
    return this.findResidentialComplexUseCase.executeBySlug(slug);
  }

  @Post()
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Residential complex created successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create residential complex',
    responseType: createBaseResponse('Residential complex created successfully'),
    bodyType: CreateResidentialComplexDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      {
        status: HttpStatus.CONFLICT,
        description: 'Residential Complex already exists',
      },
    ],
    requireAuth: true,
  })
  async createResidentialComplex(
    @Body() createResidentialComplexDto: CreateResidentialComplexDto,
  ): Promise<ResidentialComplexResponseDto> {
    return this.createResidentialComplexUseCase.execute(createResidentialComplexDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Residential complex updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a residential complex',
    responseType: createBaseResponse('Residential complex updated successfully'),
    bodyType: UpdateResidentialComplexDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Residential complex not found',
      },
      {
        status: HttpStatus.CONFLICT,
        description: 'Residential Complex already exists',
      },
    ],
    requireAuth: true,
  })
  async updateResidentialComplex(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateResidentialComplexDto: UpdateResidentialComplexDto,
  ): Promise<ResidentialComplexResponseDto> {
    return this.updateResidentialComplexUseCase.execute(id, updateResidentialComplexDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Residential complex deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create residential complex',
    responseType: createBaseResponse('Residential complex deleted successfully'),
    bodyType: UpdateResidentialComplexDto,
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Residential complex not found',
      },
    ],
    requireAuth: true,
  })
  async deleteResidentialComplex(@Param('id', new ParseUUIDPipe()) id: string): Promise<boolean> {
    return this.deleteResidentialComplexUseCase.execute(id);
  }

  @Post('/:id/common-areas')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common areas added to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create common area',
    responseType: createBaseResponse('Common areas added to residential complex successfully'),
    bodyType: CreateCommonAreasDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Residential complex not found',
      },
    ],
    requireAuth: true,
  })
  async createCommonArea(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createCommonAreasDto: CreateCommonAreasDto,
  ): Promise<CommonAreaResponseDto[]> {
    const { items } = createCommonAreasDto;
    return this.createCommonAreaUseCase.execute(id, items);
  }
}
