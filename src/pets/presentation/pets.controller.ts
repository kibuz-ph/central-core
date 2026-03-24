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
import { CreatePetsDto } from '../application/dto/create-pets.dto';
import { PetResponseDto } from '../application/dto/pet-response.dto';
import { UpdatePetDto } from '../application/dto/update-pet.dto';
import { CreatePetsUseCase } from '../application/services/create-pets.use-case';
import { DeletePetUseCase } from '../application/services/delete-pet.use-case';
import { FindPetUseCase } from '../application/services/find-pet.use-case';
import { UpdatePetUseCase } from '../application/services/update-pet.use-case';

@Controller('pets')
@UseInterceptors(ResponseWrapperInterceptor)
export class PetsController {
  constructor(
    private readonly findPetUseCase: FindPetUseCase,
    private readonly createPetsUseCase: CreatePetsUseCase,
    private readonly updatePetUseCase: UpdatePetUseCase,
    private readonly deletePetUseCase: DeletePetUseCase,
  ) {}

  @Get('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Pet retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's pet",
    responseType: createDataResponse(PetResponseDto, "Apartment's pet retrieved successfully"),
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Pet not found' }],
    requireAuth: true,
  })
  async getPetById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<PetResponseDto> {
    return this.findPetUseCase.execute(id, apartmentId);
  }

  @Post('/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Pets added to apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create pets',
    responseType: createBaseResponse('Pets added to apartment successfully'),
    bodyType: CreatePetsDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async createPets(
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() createPetsDto: CreatePetsDto,
  ): Promise<PetResponseDto[]> {
    const { items } = createPetsDto;
    return this.createPetsUseCase.execute(apartmentId, items);
  }

  @Patch('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Pet updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a pet',
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Pet not found' }],
    requireAuth: true,
  })
  async updatePet(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<boolean> {
    return this.updatePetUseCase.execute(id, apartmentId, updatePetDto);
  }

  @Delete('/:id/apartment/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Pet deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a pet',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Pet not found' }],
    requireAuth: true,
  })
  async deletePet(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<boolean> {
    return this.deletePetUseCase.execute(id, apartmentId);
  }
}
