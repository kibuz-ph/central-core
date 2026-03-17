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
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { WrapResponse } from '../../common/decorators/wrap-response.decorator';
import { createBaseResponse, createDataResponse } from '../../common/dtos/base-response.dto';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { ApartmentResponseDto } from '../application/dto/apartment-response.dto';
import { CreateApartmentsDto } from '../application/dto/create-apartments.dto';
import { UpdateApartmentDto } from '../application/dto/update-apartment.dto';
import { CreateApartmentUseCase } from '../application/services/create-apartment.use-case';
import { DeleteApartmentUseCase } from '../application/services/delete-apartment.use-case';
import { FindApartmentUseCase } from '../application/services/find-apartment.use-case';
import { UpdateApartmentUseCase } from '../application/services/update-apartment.use-case';

@Controller('apartments')
@UseInterceptors(ResponseWrapperInterceptor)
export class ApartmentsController {
  constructor(
    private readonly findApartmentUseCase: FindApartmentUseCase,
    private readonly createApartmentUseCase: CreateApartmentUseCase,
    private readonly updateApartmentUseCase: UpdateApartmentUseCase,
    private readonly deleteApartmentUseCase: DeleteApartmentUseCase,
  ) {}

  @Get('/:id/tower/:towerId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get tower's apartments",
    responseType: createDataResponse(
      ApartmentResponseDto,
      "Tower's apartment retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Apartment not found',
      },
    ],
    requireAuth: true,
  })
  async getApartmentById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('towerId', new ParseUUIDPipe()) towerId: string,
  ): Promise<ApartmentResponseDto> {
    return this.findApartmentUseCase.execute(towerId, id);
  }

  @Post('/tower/:towerId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Apartments added to tower successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create apartment',
    responseType: createBaseResponse('Apartments added to tower successfully'),
    bodyType: ApartmentResponseDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Tower not found',
      },
    ],
    requireAuth: true,
  })
  async createApartments(
    @Param('towerId', new ParseUUIDPipe()) towerId: string,
    @Body() createApartments: CreateApartmentsDto,
  ): Promise<ApartmentResponseDto[]> {
    const { residentialComplexId, items } = createApartments;
    return this.createApartmentUseCase.execute(towerId, residentialComplexId, items);
  }

  @Patch('/:id/tower/:towerId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Apartment updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Updated a apartment',
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Apartment not found',
      },
    ],
    requireAuth: true,
  })
  async updateApartment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('towerId', new ParseUUIDPipe()) towerId: string,
    @Body() updateApartment: UpdateApartmentDto,
  ): Promise<boolean> {
    return this.updateApartmentUseCase.execute(id, towerId, updateApartment);
  }

  @Delete('/:id/tower/:towerId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Apartment deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a Apartment',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Apartment not found',
      },
    ],
    requireAuth: true,
  })
  async deleteApartment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('towerId', new ParseUUIDPipe()) towerId: string,
  ): Promise<boolean> {
    return this.deleteApartmentUseCase.execute(id, towerId);
  }
}
