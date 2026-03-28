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
import { ComplexRoleGuard, RequiredComplexRoles } from '../../common/guards/complex-role.guard';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { userRoleTypes } from '../../role/domain/enums/user-role-types.enum';
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

  @Get('/:id/residential-complex/:residentialComplexId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Parking lot retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's parking lot",
    responseType: ParkingLotResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Parking lot not found' }],
    requireAuth: true,
  })
  async getParkingLotById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
  ): Promise<ParkingLotResponseDto> {
    return this.findParkingLotUseCase.execute(id, residentialComplexId);
  }

  @Post('/residential-complex/:residentialComplexId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Parking lots added to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create parking lots',
    bodyType: CreateParkingLotsDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async createParkingLots(
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
    @Body() createParkingLotsDto: CreateParkingLotsDto,
  ): Promise<ParkingLotResponseDto[]> {
    const { items } = createParkingLotsDto;
    return this.createParkingLotsUseCase.execute(residentialComplexId, items);
  }

  @Patch('/:id/residential-complex/:residentialComplexId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
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
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
    @Body() updateParkingLotDto: UpdateParkingLotDto,
  ): Promise<boolean> {
    return this.updateParkingLotUseCase.execute(id, residentialComplexId, updateParkingLotDto);
  }

  @Delete('/:id/residential-complex/:residentialComplexId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
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
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
  ): Promise<boolean> {
    return this.deleteParkingLotUseCase.execute(id, residentialComplexId);
  }
}
