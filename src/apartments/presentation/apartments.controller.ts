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
import { ApartmentComplexRoleGuard } from '../../common/guards/apartment-complex-role.guard';
import { RequiredComplexRoles } from '../../common/guards/complex-role.guard';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { ParkingLotResponseDto } from '../../parking-lots/application/dto/parking-lot-response.dto';
import { FindParkingLotsByApartmentUseCase } from '../../parking-lots/application/services/find-parking-lots-by-apartment.use-case';
import { CreatePetsDto } from '../../pets/application/dto/create-pets.dto';
import { PetResponseDto } from '../../pets/application/dto/pet-response.dto';
import { UpdatePetDto } from '../../pets/application/dto/update-pet.dto';
import { CreatePetsUseCase } from '../../pets/application/services/create-pets.use-case';
import { DeletePetUseCase } from '../../pets/application/services/delete-pet.use-case';
import { FindPetUseCase } from '../../pets/application/services/find-pet.use-case';
import { FindPetsByApartmentUseCase } from '../../pets/application/services/find-pets-by-apartment.use-case';
import { UpdatePetUseCase } from '../../pets/application/services/update-pet.use-case';
import { userRoleTypes } from '../../role/domain/enums/user-role-types.enum';
import { AssignUserToApartmentUseCase } from '../../user-apartment/application/services/assign-user-to-apartment.use-case';
import { DeleteUserApartmentUseCase } from '../../user-apartment/application/services/delete-user-apartment.use-case';
import { FindUserApartmentsByApartmentUseCase } from '../../user-apartment/application/services/find-user-apartments-by-apartment.use-case';
import { CreateUserApartmentDto } from '../../user-apartment/application/dto/create-user-apartment.dto';
import { UserApartmentResponseDto } from '../../user-apartment/application/dto/user-apartment-response.dto';
import { GetApartmentUsersResponseDto } from '../application/dto/get-apartment-users-response.dto';
import { CreateUsefulRoomsDto } from '../../useful-rooms/application/dto/create-useful-rooms.dto';
import { UpdateUsefulRoomDto } from '../../useful-rooms/application/dto/update-useful-room.dto';
import { UsefulRoomResponseDto } from '../../useful-rooms/application/dto/useful-room-response.dto';
import { CreateUsefulRoomsUseCase } from '../../useful-rooms/application/services/create-useful-rooms.use-case';
import { DeleteUsefulRoomUseCase } from '../../useful-rooms/application/services/delete-useful-room.use-case';
import { FindUsefulRoomUseCase } from '../../useful-rooms/application/services/find-useful-room.use-case';
import { FindUsefulRoomsByApartmentUseCase } from '../../useful-rooms/application/services/find-useful-rooms-by-apartment.use-case';
import { UpdateUsefulRoomUseCase } from '../../useful-rooms/application/services/update-useful-room.use-case';
import { CreateVehiclesDto } from '../../vehicles/application/dto/create-vehicles.dto';
import { UpdateVehicleDto } from '../../vehicles/application/dto/update-vehicle.dto';
import { VehicleResponseDto } from '../../vehicles/application/dto/vehicle-response.dto';
import { CreateVehiclesUseCase } from '../../vehicles/application/services/create-vehicles.use-case';
import { DeleteVehicleUseCase } from '../../vehicles/application/services/delete-vehicle.use-case';
import { FindVehicleUseCase } from '../../vehicles/application/services/find-vehicle.use-case';
import { FindVehiclesByApartmentUseCase } from '../../vehicles/application/services/find-vehicles-by-apartment.use-case';
import { UpdateVehicleUseCase } from '../../vehicles/application/services/update-vehicle.use-case';
import { GetApartmentParkingLotsResponseDto } from '../application/dto/get-apartment-parking-lots-response.dto';
import { GetApartmentPetsResponseDto } from '../application/dto/get-apartment-pets-response.dto';
import { GetApartmentUsefulRoomsResponseDto } from '../application/dto/get-apartment-useful-rooms-response.dto';
import { GetApartmentVehiclesResponseDto } from '../application/dto/get-apartment-vehicles-response.dto';

@Controller('apartments')
@UseInterceptors(ResponseWrapperInterceptor)
export class ApartmentsController {
  constructor(
    private readonly findParkingLotsByApartmentUseCase: FindParkingLotsByApartmentUseCase,
    // User apartments
    private readonly findUserApartmentsByApartmentUseCase: FindUserApartmentsByApartmentUseCase,
    private readonly assignUserToApartmentUseCase: AssignUserToApartmentUseCase,
    private readonly deleteUserApartmentUseCase: DeleteUserApartmentUseCase,
    // Pets
    private readonly findPetsByApartmentUseCase: FindPetsByApartmentUseCase,
    private readonly findPetUseCase: FindPetUseCase,
    private readonly createPetsUseCase: CreatePetsUseCase,
    private readonly updatePetUseCase: UpdatePetUseCase,
    private readonly deletePetUseCase: DeletePetUseCase,
    // Vehicles
    private readonly findVehiclesByApartmentUseCase: FindVehiclesByApartmentUseCase,
    private readonly findVehicleUseCase: FindVehicleUseCase,
    private readonly createVehiclesUseCase: CreateVehiclesUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
    // Useful rooms
    private readonly findUsefulRoomsByApartmentUseCase: FindUsefulRoomsByApartmentUseCase,
    private readonly findUsefulRoomUseCase: FindUsefulRoomUseCase,
    private readonly createUsefulRoomsUseCase: CreateUsefulRoomsUseCase,
    private readonly updateUsefulRoomUseCase: UpdateUsefulRoomUseCase,
    private readonly deleteUsefulRoomUseCase: DeleteUsefulRoomUseCase,
  ) {}

  // ─── Users ────────────────────────────────────────────────────────────────

  @Get('/:id/users')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment users retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's users",
    responseType: GetApartmentUsersResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentUsers(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserApartmentResponseDto[]> {
    return this.findUserApartmentsByApartmentUseCase.execute(id);
  }

  @Post('/:id/users')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('User assigned to apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Assign a user to an apartment',
    bodyType: CreateUserApartmentDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.NOT_FOUND, description: 'Apartment or user not found' },
      { status: HttpStatus.CONFLICT, description: 'User already assigned with this category' },
    ],
    requireAuth: true,
  })
  async assignUserToApartment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createUserApartmentDto: CreateUserApartmentDto,
  ): Promise<UserApartmentResponseDto> {
    const { userId, categoryUserName } = createUserApartmentDto;
    return this.assignUserToApartmentUseCase.execute(id, userId, categoryUserName);
  }

  @Delete('/:id/users/:userApartmentId')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('User removed from apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Remove a user from an apartment',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.NOT_FOUND, description: 'Assignment not found' }],
    requireAuth: true,
  })
  async removeUserFromApartment(
    @Param('id', new ParseUUIDPipe()) _id: string,
    @Param('userApartmentId', new ParseUUIDPipe()) userApartmentId: string,
  ): Promise<void> {
    return this.deleteUserApartmentUseCase.delete(userApartmentId);
  }

  // ─── Parking Lots ─────────────────────────────────────────────────────────

  @Get('/:id/parking-lots')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Apartment's parking lots retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get apartment's parking lots",
    responseType: GetApartmentParkingLotsResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentParkingLots(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ParkingLotResponseDto[]> {
    return this.findParkingLotsByApartmentUseCase.execute(id);
  }

  // ─── Pets ─────────────────────────────────────────────────────────────────

  @Get('/:id/pets')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment pets retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's pets",
    responseType: GetApartmentPetsResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentPets(@Param('id', new ParseUUIDPipe()) id: string): Promise<PetResponseDto[]> {
    return this.findPetsByApartmentUseCase.execute(id);
  }

  @Get('/:id/pets/:petId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Pet retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's pet",
    responseType: PetResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Pet not found' }],
    requireAuth: true,
  })
  async getPetById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('petId', new ParseUUIDPipe()) petId: string,
  ): Promise<PetResponseDto> {
    return this.findPetUseCase.execute(petId, id);
  }

  @Post('/:id/pets')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Pets added to apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create pets',
    bodyType: CreatePetsDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async createPets(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createPetsDto: CreatePetsDto,
  ): Promise<PetResponseDto[]> {
    const { items } = createPetsDto;
    return this.createPetsUseCase.execute(id, items);
  }

  @Patch('/:id/pets/:petId')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
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
    @Param('petId', new ParseUUIDPipe()) petId: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<boolean> {
    return this.updatePetUseCase.execute(petId, id, updatePetDto);
  }

  @Delete('/:id/pets/:petId')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
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
    @Param('petId', new ParseUUIDPipe()) petId: string,
  ): Promise<boolean> {
    return this.deletePetUseCase.execute(petId, id);
  }

  // ─── Vehicles ─────────────────────────────────────────────────────────────

  @Get('/:id/vehicles')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment vehicles retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's vehicles",
    responseType: GetApartmentVehiclesResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentVehicles(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<VehicleResponseDto[]> {
    return this.findVehiclesByApartmentUseCase.execute(id);
  }

  @Get('/:id/vehicles/:vehicleId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Vehicle retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's vehicle",
    responseType: VehicleResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Vehicle not found' }],
    requireAuth: true,
  })
  async getVehicleById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('vehicleId', new ParseUUIDPipe()) vehicleId: string,
  ): Promise<VehicleResponseDto> {
    return this.findVehicleUseCase.execute(vehicleId, id);
  }

  @Post('/:id/vehicles')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Vehicles added to apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create vehicles',
    bodyType: CreateVehiclesDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async createVehicles(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createVehiclesDto: CreateVehiclesDto,
  ): Promise<VehicleResponseDto[]> {
    const { items } = createVehiclesDto;
    return this.createVehiclesUseCase.execute(id, items);
  }

  @Patch('/:id/vehicles/:vehicleId')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
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
    @Param('vehicleId', new ParseUUIDPipe()) vehicleId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<boolean> {
    return this.updateVehicleUseCase.execute(vehicleId, id, updateVehicleDto);
  }

  @Delete('/:id/vehicles/:vehicleId')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
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
    @Param('vehicleId', new ParseUUIDPipe()) vehicleId: string,
  ): Promise<boolean> {
    return this.deleteVehicleUseCase.execute(vehicleId, id);
  }

  // ─── Useful Rooms ─────────────────────────────────────────────────────────

  @Get('/:id/useful-rooms')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment useful rooms retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's useful rooms",
    responseType: GetApartmentUsefulRoomsResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentUsefulRooms(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UsefulRoomResponseDto[]> {
    return this.findUsefulRoomsByApartmentUseCase.execute(id);
  }

  @Get('/:id/useful-rooms/:usefulRoomId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Useful room retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get apartment's useful room",
    responseType: UsefulRoomResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Useful room not found' }],
    requireAuth: true,
  })
  async getUsefulRoomById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('usefulRoomId', new ParseUUIDPipe()) usefulRoomId: string,
  ): Promise<UsefulRoomResponseDto> {
    return this.findUsefulRoomUseCase.execute(usefulRoomId, id);
  }

  @Post('/:id/useful-rooms')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Useful rooms added to apartment successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create useful rooms',
    bodyType: CreateUsefulRoomsDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async createUsefulRooms(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createUsefulRoomsDto: CreateUsefulRoomsDto,
  ): Promise<UsefulRoomResponseDto[]> {
    const { items } = createUsefulRoomsDto;
    return this.createUsefulRoomsUseCase.execute(id, items);
  }

  @Patch('/:id/useful-rooms/:usefulRoomId')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
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
    @Param('usefulRoomId', new ParseUUIDPipe()) usefulRoomId: string,
    @Body() updateUsefulRoomDto: UpdateUsefulRoomDto,
  ): Promise<boolean> {
    return this.updateUsefulRoomUseCase.execute(usefulRoomId, id, updateUsefulRoomDto);
  }

  @Delete('/:id/useful-rooms/:usefulRoomId')
  @UseGuards(AuthGuard(), ApartmentComplexRoleGuard)
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
    @Param('usefulRoomId', new ParseUUIDPipe()) usefulRoomId: string,
  ): Promise<boolean> {
    return this.deleteUsefulRoomUseCase.execute(usefulRoomId, id);
  }
}
