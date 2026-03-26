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
import { ComplexRoleGuard, RequiredComplexRoles } from '../../common/guards/complex-role.guard';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { userRoleTypes } from '../../role/domain/enums/user-role-types.enum';
import { CreateUsefulRoomsDto } from '../application/dto/create-useful-rooms.dto';
import { UpdateUsefulRoomDto } from '../application/dto/update-useful-room.dto';
import { UsefulRoomResponseDto } from '../application/dto/useful-room-response.dto';
import { CreateUsefulRoomsUseCase } from '../application/services/create-useful-rooms.use-case';
import { DeleteUsefulRoomUseCase } from '../application/services/delete-useful-room.use-case';
import { FindUsefulRoomUseCase } from '../application/services/find-useful-room.use-case';
import { UpdateUsefulRoomUseCase } from '../application/services/update-useful-room.use-case';

@Controller('useful-rooms')
@UseInterceptors(ResponseWrapperInterceptor)
export class UsefulRoomsController {
  constructor(
    private readonly findUsefulRoomUseCase: FindUsefulRoomUseCase,
    private readonly createUsefulRoomsUseCase: CreateUsefulRoomsUseCase,
    private readonly updateUsefulRoomUseCase: UpdateUsefulRoomUseCase,
    private readonly deleteUsefulRoomUseCase: DeleteUsefulRoomUseCase,
  ) {}

  @Get('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Useful room retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's useful room",
    responseType: createDataResponse(
      UsefulRoomResponseDto,
      "Apartment's useful room retrieved successfully",
    ),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Useful room not found' }],
    requireAuth: true,
  })
  async getUsefulRoomById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<UsefulRoomResponseDto> {
    return this.findUsefulRoomUseCase.execute(id, apartmentId);
  }

  @Post('/apartment/:apartmentId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Useful rooms added to apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create useful rooms',
    responseType: createBaseResponse('Useful rooms added to apartment successfully'),
    bodyType: CreateUsefulRoomsDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async createUsefulRooms(
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() createUsefulRoomsDto: CreateUsefulRoomsDto,
  ): Promise<UsefulRoomResponseDto[]> {
    const { items } = createUsefulRoomsDto;
    return this.createUsefulRoomsUseCase.execute(apartmentId, items);
  }

  @Patch('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Useful room updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a useful room',
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Useful room not found' }],
    requireAuth: true,
  })
  async updateUsefulRoom(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() updateUsefulRoomDto: UpdateUsefulRoomDto,
  ): Promise<boolean> {
    return this.updateUsefulRoomUseCase.execute(id, apartmentId, updateUsefulRoomDto);
  }

  @Delete('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Useful room deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a useful room',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Useful room not found' }],
    requireAuth: true,
  })
  async deleteUsefulRoom(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<boolean> {
    return this.deleteUsefulRoomUseCase.execute(id, apartmentId);
  }
}
