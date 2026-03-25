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
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { WrapResponse } from '../../common/decorators/wrap-response.decorator';
import { createBaseResponse, createDataResponse } from '../../common/dtos/base-response.dto';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { ParkingLotResponseDto } from '../../parking-lots/application/dto/parking-lot-response.dto';
import { FindParkingLotsByApartmentUseCase } from '../../parking-lots/application/services/find-parking-lots-by-apartment.use-case';
import { PetResponseDto } from '../../pets/application/dto/pet-response.dto';
import { FindPetsByApartmentUseCase } from '../../pets/application/services/find-pets-by-apartment.use-case';
import { UsefulRoomResponseDto } from '../../useful-rooms/application/dto/useful-room-response.dto';
import { FindUsefulRoomsByApartmentUseCase } from '../../useful-rooms/application/services/find-useful-rooms-by-apartment.use-case';
import { VehicleResponseDto } from '../../vehicles/application/dto/vehicle-response.dto';
import { FindVehiclesByApartmentUseCase } from '../../vehicles/application/services/find-vehicles-by-apartment.use-case';
import { ApartmentResponseDto } from '../application/dto/apartment-response.dto';
import { CreateApartmentsDto } from '../application/dto/create-apartments.dto';
import { UpdateApartmentDto } from '../application/dto/update-apartment.dto';
import { CreateApartmentsUseCase } from '../application/services/create-apartments.use-case';
import { DeleteApartmentUseCase } from '../application/services/delete-apartment.use-case';
import { FindApartmentUseCase } from '../application/services/find-apartment.use-case';
import { UpdateApartmentUseCase } from '../application/services/update-apartment.use-case';

@Controller('apartments')
@UseInterceptors(ResponseWrapperInterceptor)
export class ApartmentsController {
  constructor(
    private readonly findApartmentUseCase: FindApartmentUseCase,
    private readonly createApartmentsUseCase: CreateApartmentsUseCase,
    private readonly updateApartmentUseCase: UpdateApartmentUseCase,
    private readonly deleteApartmentUseCase: DeleteApartmentUseCase,
    private readonly findParkingLotsByApartmentUseCase: FindParkingLotsByApartmentUseCase,
    private readonly findUsefulRoomsByApartmentUseCase: FindUsefulRoomsByApartmentUseCase,
    private readonly findVehiclesByApartmentUseCase: FindVehiclesByApartmentUseCase,
    private readonly findPetsByApartmentUseCase: FindPetsByApartmentUseCase,
  ) {}

  @Get('/:id/residential-complex/:residentialComplexId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get tower's or residential complex's apartments",
    responseType: createDataResponse(
      ApartmentResponseDto,
      "Tower's or residential complex's apartment retrieved successfully",
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
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
  ): Promise<ApartmentResponseDto> {
    return this.findApartmentUseCase.execute(id, residentialComplexId);
  }

  @Post('/residential-complex/:residentialComplexId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Apartments added to tower or residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create apartment',
    responseType: createBaseResponse(
      'Apartments added to tower or residential complex successfully',
    ),
    bodyType: ApartmentResponseDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Residential complex not found',
      },
    ],
    requireAuth: true,
  })
  async createApartments(
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
    @Body() createApartments: CreateApartmentsDto,
  ): Promise<ApartmentResponseDto[]> {
    const { items } = createApartments;
    return this.createApartmentsUseCase.execute(residentialComplexId, items);
  }

  @Patch('/:id/residential-complex/:residentialComplexId')
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
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
    @Body() updateApartment: UpdateApartmentDto,
  ): Promise<boolean> {
    return this.updateApartmentUseCase.execute(id, residentialComplexId, updateApartment);
  }

  @Delete('/:id/residential-complex/:residentialComplexId')
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
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
  ): Promise<boolean> {
    return this.deleteApartmentUseCase.execute(id, residentialComplexId);
  }

  @Get('/:id/parking-lots')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Apartment's parking lots retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get apartment's parking lots",
    responseType: createDataResponse(
      ParkingLotResponseDto,
      "Apartment's parking lots retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentParkingLots(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ParkingLotResponseDto[]> {
    return this.findParkingLotsByApartmentUseCase.execute(id);
  }

  @Get('/:id/vehicles')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment vehicles retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's vehicles",
    responseType: createDataResponse(
      VehicleResponseDto,
      "Apartment's vehicles retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentVehicles(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleResponseDto[]> {
    return this.findVehiclesByApartmentUseCase.execute(id);
  }

  @Get('/:id/pets')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment pets retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's pets",
    responseType: createDataResponse(PetResponseDto, "Apartment's pets retrieved successfully"),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentPets(@Param('id', new ParseUUIDPipe()) id: string): Promise<PetResponseDto[]> {
    return this.findPetsByApartmentUseCase.execute(id);
  }

  @Get('/:id/useful-rooms')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment useful rooms retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's useful rooms",
    responseType: createDataResponse(
      UsefulRoomResponseDto,
      "Apartment's useful rooms retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentUsefulRooms(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UsefulRoomResponseDto[]> {
    return this.findUsefulRoomsByApartmentUseCase.execute(id);
  }
}
