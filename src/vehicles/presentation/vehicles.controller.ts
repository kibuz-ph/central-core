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
import { CreateVehiclesDto } from '../application/dto/create-vehicles.dto';
import { UpdateVehicleDto } from '../application/dto/update-vehicle.dto';
import { VehicleResponseDto } from '../application/dto/vehicle-response.dto';
import { CreateVehiclesUseCase } from '../application/services/create-vehicles.use-case';
import { DeleteVehicleUseCase } from '../application/services/delete-vehicle.use-case';
import { FindVehicleUseCase } from '../application/services/find-vehicle.use-case';
import { UpdateVehicleUseCase } from '../application/services/update-vehicle.use-case';

@Controller('vehicles')
@UseInterceptors(ResponseWrapperInterceptor)
export class VehiclesController {
  constructor(
    private readonly findVehicleUseCase: FindVehicleUseCase,
    private readonly createVehiclesUseCase: CreateVehiclesUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @Get('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Vehicle retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's vehicle",
    responseType: createDataResponse(
      VehicleResponseDto,
      "Apartment's vehicle retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Vehicle not found' }],
    requireAuth: true,
  })
  async getVehicleById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<VehicleResponseDto> {
    return this.findVehicleUseCase.execute(id, apartmentId);
  }

  @Post('/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Vehicles added to apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create vehicles',
    responseType: createBaseResponse('Vehicles added to apartment successfully'),
    bodyType: CreateVehiclesDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async createVehicles(
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() createVehiclesDto: CreateVehiclesDto,
  ): Promise<VehicleResponseDto[]> {
    const { items } = createVehiclesDto;
    return this.createVehiclesUseCase.execute(apartmentId, items);
  }

  @Patch('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Vehicle updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a vehicle',
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Vehicle not found' }],
    requireAuth: true,
  })
  async updateVehicle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<boolean> {
    return this.updateVehicleUseCase.execute(id, apartmentId, updateVehicleDto);
  }

  @Delete('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Vehicle deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a vehicle',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Vehicle not found' }],
    requireAuth: true,
  })
  async deleteVehicle(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<boolean> {
    return this.deleteVehicleUseCase.execute(id, apartmentId);
  }
}
