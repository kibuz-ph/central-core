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
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { ApartmentResponseDto } from '../../apartments/application/dto/apartment-response.dto';
import { ApartmentFilterQueryDto } from '../../apartments/application/dto/apartment-filter-query.dto';
import { CreateApartmentsDto } from '../../apartments/application/dto/create-apartments.dto';
import { UpdateApartmentDto } from '../../apartments/application/dto/update-apartment.dto';
import { CreateApartmentsUseCase } from '../../apartments/application/services/create-apartments.use-case';
import { DeleteApartmentUseCase } from '../../apartments/application/services/delete-apartment.use-case';
import { FindApartmentUseCase } from '../../apartments/application/services/find-apartment.use-case';
import { FindApartmentsByResidentialComplexUseCase } from '../../apartments/application/services/find-apartments-by-residential-complex.use-case';
import { UpdateApartmentUseCase } from '../../apartments/application/services/update-apartment.use-case';
import { CommonAreaResponseDto } from '../../common-area/application/dto/common-area-response.dto';
import { CreateCommonAreasDto } from '../../common-area/application/dto/create-common-areas.dto';
import { UpdateCommonAreaDto } from '../../common-area/application/dto/update-common-area.dto';
import { CreateCommonAreaUseCase } from '../../common-area/application/services/create-common-area.use-case';
import { DeleteCommonAreaUseCase } from '../../common-area/application/services/delete-common-area.use-case';
import { FindCommonAreasByResidentialComplexUseCase } from '../../common-area/application/services/find-common-areas-by-residential-complex.use-case';
import { GetCommonAreaUseCase } from '../../common-area/application/services/get-common-area.use-case';
import { UpdateCommonAreaUseCase } from '../../common-area/application/services/update-common-area.use-case';
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { WrapResponse } from '../../common/decorators/wrap-response.decorator';
import { PaginatedResponseDto } from '../../common/dtos/paginates-response.dto';
import { ComplexRoleGuard, RequiredComplexRoles } from '../../common/guards/complex-role.guard';
import { RequiredUserTypes, UserTypeGuard } from '../../common/guards/user-type.guard';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { CreateParkingLotsDto } from '../../parking-lots/application/dto/create-parking-lots.dto';
import { ParkingLotFilterQueryDto } from '../../parking-lots/application/dto/parking-lot-filter-query.dto';
import { ParkingLotResponseDto } from '../../parking-lots/application/dto/parking-lot-response.dto';
import { UpdateParkingLotDto } from '../../parking-lots/application/dto/update-parking-lot.dto';
import { CreateParkingLotsUseCase } from '../../parking-lots/application/services/create-parking-lots.use-case';
import { DeleteParkingLotUseCase } from '../../parking-lots/application/services/delete-parking-lot.use-case';
import { FindParkingLotUseCase } from '../../parking-lots/application/services/find-parking-lot.use-case';
import { FindParkingLotsByResidentialComplexUseCase } from '../../parking-lots/application/services/find-parking-lots-by-residential-complex.use-case';
import { UpdateParkingLotUseCase } from '../../parking-lots/application/services/update-parking-lot.use-case';
import { userRoleTypes } from '../../role/domain/enums/user-role-types.enum';
import { CreateTowersDto } from '../../towers/application/dto/create-towers.dto';
import { TowerResponseDto } from '../../towers/application/dto/tower-response.dto';
import { UpdateTowerDto } from '../../towers/application/dto/update-tower.dto';
import { CreateTowerUseCase } from '../../towers/application/services/create-tower.use-case';
import { DeleteTowerUseCase } from '../../towers/application/services/delete-tower.use-case';
import { FindTowersByResidentialComplexUseCase } from '../../towers/application/services/find-towers-by-residential-complex.use-case';
import { FindTowersUseCase } from '../../towers/application/services/find-towers.use-case';
import { UpdateTowerUseCase } from '../../towers/application/services/update-tower.use-case';
import { CreateUserDto } from '../../users/application/dto/create-user.dto';
import { UserResponseDto } from '../../users/application/dto/user-response.dto';
import { UserProps } from '../../users/domain/entities/user.entity';
import { userTypes } from '../../users/domain/enums/user-types.enum';
import { AssignUserToComplexDto } from '../application/dto/assign-user-to-complex.dto';
import { CreateResidentialComplexDto } from '../application/dto/create-residential-complex.dto';
import { GetMyResidentialComplexesResponseDto } from '../application/dto/get-my-residential-complexes-response.dto';
import { GetResidentialComplexApartmentsResponseDto } from '../application/dto/get-residential-complex-apartments-response.dto';
import { GetResidentialComplexCommonAreasResponseDto } from '../application/dto/get-residential-complex-common-areas-response.dto';
import { GetResidentialComplexParkingLotsResponseDto } from '../application/dto/get-residential-complex-parking-lots-response.dto';
import { GetResidentialComplexTowersResponseDto } from '../application/dto/get-residential-complex-towers-response.dto';
import { GetResidentialComplexUsefulRoomsResponseDto } from '../application/dto/get-residential-complex-useful-rooms-response.dto';
import { GetResidentialComplexVehiclesResponseDto } from '../application/dto/get-residential-complex-vehicles-response.dto';
import { GetResidentialComplexPetsResponseDto } from '../application/dto/get-residential-complex-pets-response.dto';
import { UsefulRoomFilterQueryDto } from '../../useful-rooms/application/dto/useful-room-filter-query.dto';
import { UsefulRoomResponseDto } from '../../useful-rooms/application/dto/useful-room-response.dto';
import { FindUsefulRoomsByResidentialComplexUseCase } from '../../useful-rooms/application/services/find-useful-rooms-by-residential-complex.use-case';
import { VehicleFilterQueryDto } from '../../vehicles/application/dto/vehicle-filter-query.dto';
import { VehicleResponseDto } from '../../vehicles/application/dto/vehicle-response.dto';
import { FindVehiclesByResidentialComplexUseCase } from '../../vehicles/application/services/find-vehicles-by-residential-complex.use-case';
import { PetFilterQueryDto } from '../../pets/application/dto/pet-filter-query.dto';
import { PetResponseDto } from '../../pets/application/dto/pet-response.dto';
import { FindPetsByResidentialComplexUseCase } from '../../pets/application/services/find-pets-by-residential-complex.use-case';
import { ResidentialComplexResponseDto } from '../application/dto/residential-complex-response.dto';
import { UpdateResidentialComplexDto } from '../application/dto/update-residential-complex.dto';
import { AssignUserToComplexUseCase } from '../application/services/assign-user-to-complex.use-case';
import { CreateResidentialComplexUseCase } from '../application/services/create-residential-complex.use-case';
import { DeleteResidentialComplexUseCase } from '../application/services/delete-residential-complex.use-case';
import { FindResidentialComplexUseCase } from '../application/services/find-residential-complex.use-case';
import { FindResidentialComplexesByUserUseCase } from '../application/services/find-residential-complexes-by-user.use-case';
import { RegisterUserToComplexUseCase } from '../application/services/register-user-to-complex.use-case';
import { UpdateResidentialComplexUseCase } from '../application/services/update-residential-complex.use-case';

@Controller('residential-complexes')
@UseInterceptors(ResponseWrapperInterceptor)
export class ResidentialComplexController {
  constructor(
    private readonly findResidentialComplexUseCase: FindResidentialComplexUseCase,
    private readonly findResidentialComplexesByUserUseCase: FindResidentialComplexesByUserUseCase,
    private readonly createResidentialComplexUseCase: CreateResidentialComplexUseCase,
    private readonly updateResidentialComplexUseCase: UpdateResidentialComplexUseCase,
    private readonly deleteResidentialComplexUseCase: DeleteResidentialComplexUseCase,
    private readonly registerUserToComplexUseCase: RegisterUserToComplexUseCase,
    private readonly assignUserToComplexUseCase: AssignUserToComplexUseCase,
    // Common areas
    private readonly findCommonAreasByResidentialComplexUseCase: FindCommonAreasByResidentialComplexUseCase,
    private readonly getCommonAreaUseCase: GetCommonAreaUseCase,
    private readonly createCommonAreaUseCase: CreateCommonAreaUseCase,
    private readonly updateCommonAreaUseCase: UpdateCommonAreaUseCase,
    private readonly deleteCommonAreaUseCase: DeleteCommonAreaUseCase,
    // Towers
    private readonly findTowersByResidentialComplexUseCase: FindTowersByResidentialComplexUseCase,
    private readonly findTowersUseCase: FindTowersUseCase,
    private readonly createTowerUseCase: CreateTowerUseCase,
    private readonly updateTowerUseCase: UpdateTowerUseCase,
    private readonly deleteTowerUseCase: DeleteTowerUseCase,
    // Parking lots
    private readonly findParkingLotsByResidentialComplexUseCase: FindParkingLotsByResidentialComplexUseCase,
    private readonly findParkingLotUseCase: FindParkingLotUseCase,
    private readonly createParkingLotsUseCase: CreateParkingLotsUseCase,
    private readonly updateParkingLotUseCase: UpdateParkingLotUseCase,
    private readonly deleteParkingLotUseCase: DeleteParkingLotUseCase,
    // Apartments
    private readonly findApartmentUseCase: FindApartmentUseCase,
    private readonly findApartmentsByResidentialComplexUseCase: FindApartmentsByResidentialComplexUseCase,
    private readonly createApartmentsUseCase: CreateApartmentsUseCase,
    private readonly updateApartmentUseCase: UpdateApartmentUseCase,
    private readonly deleteApartmentUseCase: DeleteApartmentUseCase,
    // Useful rooms
    private readonly findUsefulRoomsByResidentialComplexUseCase: FindUsefulRoomsByResidentialComplexUseCase,
    // Vehicles
    private readonly findVehiclesByResidentialComplexUseCase: FindVehiclesByResidentialComplexUseCase,
    // Pets
    private readonly findPetsByResidentialComplexUseCase: FindPetsByResidentialComplexUseCase,
  ) {}

  // ─── Residential Complex ──────────────────────────────────────────────────

  @Get('/me')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Residential complexes retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: 'Get residential complexes for the authenticated user',
    responseType: GetMyResidentialComplexesResponseDto,
    successStatus: HttpStatus.OK,
    requireAuth: true,
  })
  async getResidentialComplexesByUser(
    @Req() req: Request & { user: Omit<UserProps, 'password'> & { id: string } },
  ): Promise<ResidentialComplexResponseDto[]> {
    return this.findResidentialComplexesByUserUseCase.execute(req.user.id);
  }

  @Get('/:slug')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Residential complex retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: 'Get residential complex by slug',
    responseType: ResidentialComplexResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async getResidentialComplex(@Param('slug') slug: string): Promise<ResidentialComplexResponseDto> {
    return this.findResidentialComplexUseCase.executeBySlug(slug);
  }

  @Post()
  @UseGuards(AuthGuard(), UserTypeGuard)
  @RequiredUserTypes(userTypes.KIBUZ)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Residential complex created successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create residential complex',
    responseType: ResidentialComplexResponseDto,
    bodyType: CreateResidentialComplexDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.CONFLICT, description: 'Residential Complex already exists' },
    ],
    requireAuth: true,
  })
  async createResidentialComplex(
    @Req() req: Request & { user: Omit<UserProps, 'password'> & { id: string } },
    @Body() createResidentialComplexDto: CreateResidentialComplexDto,
  ): Promise<ResidentialComplexResponseDto> {
    return this.createResidentialComplexUseCase.execute(createResidentialComplexDto, req.user.id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Residential complex updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a residential complex',
    responseType: ResidentialComplexResponseDto,
    bodyType: UpdateResidentialComplexDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
      { status: HttpStatus.CONFLICT, description: 'Residential Complex already exists' },
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
  @UseGuards(AuthGuard(), UserTypeGuard)
  @RequiredUserTypes(userTypes.KIBUZ)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Residential complex deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete residential complex',
    bodyType: UpdateResidentialComplexDto,
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async deleteResidentialComplex(@Param('id', new ParseUUIDPipe()) id: string): Promise<boolean> {
    return this.deleteResidentialComplexUseCase.execute(id);
  }

  @Post('/:id/users')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('User registered to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Register a user with USER role in a residential complex',
    description: `Creates a new user and assigns the USER role for the given residential complex.
      If the user already exists (by email), assigns the role without creating a new user.
      Requires ADMIN or MASTER role in the residential complex.`,
    bodyType: CreateUserDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
      { status: HttpStatus.CONFLICT, description: 'User already has this role in the complex' },
      { status: HttpStatus.FORBIDDEN, description: 'Insufficient permissions' },
    ],
    requireAuth: true,
  })
  async registerUserToComplex(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.registerUserToComplexUseCase.execute(createUserDto, id, userRoleTypes.USER);
  }

  @Post('/:id/users/assign')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 10, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('User assigned to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Assign an existing user with USER role to a residential complex',
    description: `Assigns the USER role to an existing user for the given residential complex.
      Requires ADMIN or MASTER role in the residential complex.`,
    bodyType: AssignUserToComplexDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.NOT_FOUND, description: 'User or residential complex not found' },
      { status: HttpStatus.CONFLICT, description: 'User already has USER role in the complex' },
      { status: HttpStatus.FORBIDDEN, description: 'Insufficient permissions' },
    ],
    requireAuth: true,
  })
  async assignUserToComplex(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() assignUserToComplexDto: AssignUserToComplexDto,
  ): Promise<UserResponseDto> {
    return this.assignUserToComplexUseCase.execute(assignUserToComplexDto.userId, id);
  }

  @Post('/:id/admins')
  @UseGuards(AuthGuard(), UserTypeGuard)
  @RequiredUserTypes(userTypes.KIBUZ)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Admin registered to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Register a user with ADMIN role in a residential complex',
    description: `Creates a new user and assigns the ADMIN role for the given residential complex.
      If the user already exists (by email), assigns the role without creating a new user.
      Requires KIBUZ user type.`,
    bodyType: CreateUserDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
      { status: HttpStatus.CONFLICT, description: 'User already has this role in the complex' },
      { status: HttpStatus.FORBIDDEN, description: 'Insufficient permissions' },
    ],
    requireAuth: true,
  })
  async registerAdminToComplex(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.registerUserToComplexUseCase.execute(createUserDto, id, userRoleTypes.ADMIN);
  }

  @Post('/:id/admins/assign')
  @UseGuards(AuthGuard(), UserTypeGuard)
  @RequiredUserTypes(userTypes.KIBUZ)
  @Throttle({ default: { limit: 10, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Admin assigned to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Assign an existing user with ADMIN role to a residential complex',
    description: `Assigns the ADMIN role to an existing user for the given residential complex.
      Requires KIBUZ user type.`,
    bodyType: AssignUserToComplexDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.NOT_FOUND, description: 'User or residential complex not found' },
      { status: HttpStatus.CONFLICT, description: 'User already has ADMIN role in the complex' },
      { status: HttpStatus.FORBIDDEN, description: 'Insufficient permissions' },
    ],
    requireAuth: true,
  })
  async assignAdminToComplex(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() assignUserToComplexDto: AssignUserToComplexDto,
  ): Promise<UserResponseDto> {
    return this.assignUserToComplexUseCase.execute(
      assignUserToComplexDto.userId,
      id,
      userRoleTypes.ADMIN,
    );
  }

  // ─── Common Areas ─────────────────────────────────────────────────────────

  @Get('/:id/common-areas')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Residential complex's common areas retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's common areas",
    responseType: GetResidentialComplexCommonAreasResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async getResidentialComplexCommonAreas(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CommonAreaResponseDto[]> {
    return this.findCommonAreasByResidentialComplexUseCase.execute(id);
  }

  @Get('/:id/common-areas/:commonAreaId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Common area retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's common area",
    responseType: CommonAreaResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Common area not found' }],
    requireAuth: true,
  })
  async getCommonAreaById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('commonAreaId', new ParseUUIDPipe()) commonAreaId: string,
  ): Promise<CommonAreaResponseDto> {
    return this.getCommonAreaUseCase.execute(commonAreaId, id);
  }

  @Post('/:id/common-areas')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common areas added to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create common areas',
    bodyType: CreateCommonAreasDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
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

  @Patch('/:id/common-areas/:commonAreaId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common area updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a common area',
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Common area not found' }],
    requireAuth: true,
  })
  async updateCommonArea(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('commonAreaId', new ParseUUIDPipe()) commonAreaId: string,
    @Body() updateCommonAreaDto: UpdateCommonAreaDto,
  ): Promise<boolean> {
    return this.updateCommonAreaUseCase.execute(commonAreaId, id, updateCommonAreaDto);
  }

  @Delete('/:id/common-areas/:commonAreaId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Common area deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a common area',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Common area not found' }],
    requireAuth: true,
  })
  async deleteCommonArea(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('commonAreaId', new ParseUUIDPipe()) commonAreaId: string,
  ): Promise<boolean> {
    return this.deleteCommonAreaUseCase.execute(commonAreaId, id);
  }

  // ─── Towers ───────────────────────────────────────────────────────────────

  @Get('/:id/towers')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Residential complex's towers retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's towers",
    responseType: GetResidentialComplexTowersResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async getResidentialComplexTowers(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<TowerResponseDto[]> {
    return this.findTowersByResidentialComplexUseCase.execute(id);
  }

  @Get('/:id/towers/:towerId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Tower retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's tower",
    responseType: TowerResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Tower not found' }],
    requireAuth: true,
  })
  async getTowerById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('towerId', new ParseUUIDPipe()) towerId: string,
  ): Promise<TowerResponseDto> {
    return this.findTowersUseCase.execute(id, towerId);
  }

  @Post('/:id/towers')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Towers added to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create towers',
    bodyType: CreateTowersDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async createTowers(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createTowersDto: CreateTowersDto,
  ): Promise<TowerResponseDto[]> {
    const { items } = createTowersDto;
    return this.createTowerUseCase.execute(id, items);
  }

  @Patch('/:id/towers/:towerId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Tower updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a tower',
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Tower not found' }],
    requireAuth: true,
  })
  async updateTower(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('towerId', new ParseUUIDPipe()) towerId: string,
    @Body() updateTowerDto: UpdateTowerDto,
  ): Promise<boolean> {
    return this.updateTowerUseCase.execute(towerId, id, updateTowerDto);
  }

  @Delete('/:id/towers/:towerId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Tower deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete a tower',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Tower not found' }],
    requireAuth: true,
  })
  async deleteTower(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('towerId', new ParseUUIDPipe()) towerId: string,
  ): Promise<boolean> {
    return this.deleteTowerUseCase.execute(towerId, id);
  }

  // ─── Parking Lots ─────────────────────────────────────────────────────────

  @Get('/:id/parking-lots')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Residential complex's parking lots retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's parking lots (paginated)",
    responseType: GetResidentialComplexParkingLotsResponseDto,
    queryType: ParkingLotFilterQueryDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Page is out of the range' }],
    requireAuth: true,
  })
  async getResidentialComplexParkingLots(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() query: ParkingLotFilterQueryDto,
  ): Promise<PaginatedResponseDto<ParkingLotResponseDto>> {
    return this.findParkingLotsByResidentialComplexUseCase.execute(id, query);
  }

  @Get('/:id/parking-lots/:parkingLotId')
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
    @Param('parkingLotId', new ParseUUIDPipe()) parkingLotId: string,
  ): Promise<ParkingLotResponseDto> {
    return this.findParkingLotUseCase.execute(parkingLotId, id);
  }

  @Post('/:id/parking-lots')
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
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createParkingLotsDto: CreateParkingLotsDto,
  ): Promise<ParkingLotResponseDto[]> {
    const { items } = createParkingLotsDto;
    return this.createParkingLotsUseCase.execute(id, items);
  }

  @Patch('/:id/parking-lots/:parkingLotId')
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
    @Param('parkingLotId', new ParseUUIDPipe()) parkingLotId: string,
    @Body() updateParkingLotDto: UpdateParkingLotDto,
  ): Promise<boolean> {
    return this.updateParkingLotUseCase.execute(parkingLotId, id, updateParkingLotDto);
  }

  @Delete('/:id/parking-lots/:parkingLotId')
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
    @Param('parkingLotId', new ParseUUIDPipe()) parkingLotId: string,
  ): Promise<boolean> {
    return this.deleteParkingLotUseCase.execute(parkingLotId, id);
  }

  // ─── Apartments ───────────────────────────────────────────────────────────

  @Get('/:id/apartments')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Residential complex's apartments retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's apartments (paginated)",
    responseType: GetResidentialComplexApartmentsResponseDto,
    queryType: ApartmentFilterQueryDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Page is out of the range' }],
    requireAuth: true,
  })
  async getResidentialComplexApartments(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() query: ApartmentFilterQueryDto,
  ): Promise<PaginatedResponseDto<ApartmentResponseDto>> {
    return this.findApartmentsByResidentialComplexUseCase.execute(id, query);
  }

  @Get('/:id/apartments/:apartmentId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('Apartment retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's apartment",
    responseType: ApartmentResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async getApartmentById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<ApartmentResponseDto> {
    return this.findApartmentUseCase.execute(apartmentId, id);
  }

  @Post('/:id/apartments')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Apartments added to residential complex successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create apartments',
    bodyType: CreateApartmentsDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async createApartments(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createApartmentsDto: CreateApartmentsDto,
  ): Promise<ApartmentResponseDto[]> {
    const { items } = createApartmentsDto;
    return this.createApartmentsUseCase.execute(id, items);
  }

  @Patch('/:id/apartments/:apartmentId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Apartment updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update an apartment',
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async updateApartment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
    @Body() updateApartmentDto: UpdateApartmentDto,
  ): Promise<boolean> {
    return this.updateApartmentUseCase.execute(apartmentId, id, updateApartmentDto);
  }

  @Delete('/:id/apartments/:apartmentId')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.NO_CONTENT)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Apartment deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Delete an apartment',
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Apartment not found' }],
    requireAuth: true,
  })
  async deleteApartment(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('apartmentId', new ParseUUIDPipe()) apartmentId: string,
  ): Promise<boolean> {
    return this.deleteApartmentUseCase.execute(apartmentId, id);
  }

  // ─── Useful Rooms ─────────────────────────────────────────────────────────

  @Get('/:id/useful-rooms')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Residential complex's useful rooms retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's useful rooms (paginated)",
    responseType: GetResidentialComplexUsefulRoomsResponseDto,
    queryType: UsefulRoomFilterQueryDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Page is out of the range' }],
    requireAuth: true,
  })
  async getResidentialComplexUsefulRooms(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() query: UsefulRoomFilterQueryDto,
  ): Promise<PaginatedResponseDto<UsefulRoomResponseDto>> {
    return this.findUsefulRoomsByResidentialComplexUseCase.execute(id, query);
  }

  // ─── Vehicles ─────────────────────────────────────────────────────────────

  @Get('/:id/vehicles')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Residential complex's vehicles retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's vehicles (paginated)",
    responseType: GetResidentialComplexVehiclesResponseDto,
    queryType: VehicleFilterQueryDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Page is out of the range' }],
    requireAuth: true,
  })
  async getResidentialComplexVehicles(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() query: VehicleFilterQueryDto,
  ): Promise<PaginatedResponseDto<VehicleResponseDto>> {
    return this.findVehiclesByResidentialComplexUseCase.execute(id, query);
  }

  // ─── Pets ─────────────────────────────────────────────────────────────────

  @Get('/:id/pets')
  @UseGuards(AuthGuard(), ComplexRoleGuard)
  @RequiredComplexRoles(userRoleTypes.ADMIN, userRoleTypes.MASTER)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Residential complex's pets retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's pets (paginated)",
    responseType: GetResidentialComplexPetsResponseDto,
    queryType: PetFilterQueryDto,
    successStatus: HttpStatus.OK,
    extraResponses: [{ status: HttpStatus.BAD_REQUEST, description: 'Page is out of the range' }],
    requireAuth: true,
  })
  async getResidentialComplexPets(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query() query: PetFilterQueryDto,
  ): Promise<PaginatedResponseDto<PetResponseDto>> {
    return this.findPetsByResidentialComplexUseCase.execute(id, query);
  }
}
