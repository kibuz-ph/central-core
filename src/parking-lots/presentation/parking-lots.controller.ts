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
import { CreateParkingLotsDto } from '../application/dto/create-parking-lots.dto';
import { ParkingLotResponseDto } from '../application/dto/parking-lot-response.dto';
import { UpdateParkingLotDto } from '../application/dto/update-parking-lot.dto';
import { CreateParkingLotsUseCase } from '../application/services/create-parking-lots.use-case';
import { DeleteParkingLotUseCase } from '../application/services/delete-parking-lot.use-case';
import { FindParkingLotUseCase } from '../application/services/find-parking-lot.use-case';
import { UpdateParkingLotUseCase } from '../application/services/update-parking-lot.use-case';

@Controller('parking-lots')
@UseInterceptors(ResponseWrapperInterceptor)
export class ParkingLotsController {
  constructor(
    private readonly findParkingLotUseCase: FindParkingLotUseCase,
    private readonly createParkingLotsUseCase: CreateParkingLotsUseCase,
    private readonly updateParkingLotUseCase: UpdateParkingLotUseCase,
    private readonly deleteParkingLotUseCase: DeleteParkingLotUseCase,
  ) {}

  @Get('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Parking lot retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's parking lot",
    responseType: createDataResponse(
      ParkingLotResponseDto,
      "Apartment's parking lot retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Parking lot not found' }],
    requireAuth: true,
  })
  async getParkingLotById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<ParkingLotResponseDto> {
    return this.findParkingLotUseCase.execute(id, apartmentId);
  }

  @Post('/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Parking lots added to apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create parking lots',
    responseType: createBaseResponse('Parking lots added to apartment successfully'),
    bodyType: CreateParkingLotsDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async createParkingLots(
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() createParkingLotsDto: CreateParkingLotsDto,
  ): Promise<ParkingLotResponseDto[]> {
    const { items } = createParkingLotsDto;
    return this.createParkingLotsUseCase.execute(apartmentId, items);
  }

  @Patch('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Parking lot updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a parking lot',
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Parking lot not found' }],
    requireAuth: true,
  })
  async updateParkingLot(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() updateParkingLotDto: UpdateParkingLotDto,
  ): Promise<boolean> {
    return this.updateParkingLotUseCase.execute(id, apartmentId, updateParkingLotDto);
  }

  @Delete('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Parking lot deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a parking lot',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Parking lot not found' }],
    requireAuth: true,
  })
  async deleteParkingLot(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<boolean> {
    return this.deleteParkingLotUseCase.execute(id, apartmentId);
  }
}
