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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { CommonAreaResponseDto } from '../../common-area/application/dto/common-area-response.dto';
import { FindCommonAreasByResidentialComplexUseCase } from '../../common-area/application/services/find-common-areas-by-residential-complex.use-case';
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { WrapResponse } from '../../common/decorators/wrap-response.decorator';
import { ComplexRoleGuard, RequiredComplexRoles } from '../../common/guards/complex-role.guard';
import { RequiredUserTypes, UserTypeGuard } from '../../common/guards/user-type.guard';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { ParkingLotResponseDto } from '../../parking-lots/application/dto/parking-lot-response.dto';
import { FindParkingLotsByResidentialComplexUseCase } from '../../parking-lots/application/services/find-parking-lots-by-residential-complex.use-case';
import { userRoleTypes } from '../../role/domain/enums/user-role-types.enum';
import { TowerResponseDto } from '../../towers/application/dto/tower-response.dto';
import { FindTowersByResidentialComplexUseCase } from '../../towers/application/services/find-towers-by-residential-complex.use-case';
import { CreateUserDto } from '../../users/application/dto/create-user.dto';
import { UserResponseDto } from '../../users/application/dto/user-response.dto';
import { UserProps } from '../../users/domain/entities/user.entity';
import { userTypes } from '../../users/domain/enums/user-types.enum';
import { CreateResidentialComplexDto } from '../application/dto/create-residential-complex.dto';
import { GetMyResidentialComplexesResponseDto } from '../application/dto/get-my-residential-complexes-response.dto';
import { GetResidentialComplexCommonAreasResponseDto } from '../application/dto/get-residential-complex-common-areas-response.dto';
import { GetResidentialComplexParkingLotsResponseDto } from '../application/dto/get-residential-complex-parking-lots-response.dto';
import { GetResidentialComplexTowersResponseDto } from '../application/dto/get-residential-complex-towers-response.dto';
import { ResidentialComplexResponseDto } from '../application/dto/residential-complex-response.dto';
import { UpdateResidentialComplexDto } from '../application/dto/update-residential-complex.dto';
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
    private readonly findCommonAreasByResidentialComplexUseCase: FindCommonAreasByResidentialComplexUseCase,
    private readonly findParkingLotsByResidentialComplexUseCase: FindParkingLotsByResidentialComplexUseCase,
    private readonly findTowersByResidentialComplexUseCase: FindTowersByResidentialComplexUseCase,
  ) {}

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

  @Get('/:id/parking-lots')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator("Residential complex's parking lots retrieved successfully")
  @EndpointSwaggerDecorator({
    summary: "Get residential complex's parking lots",
    responseType: GetResidentialComplexParkingLotsResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async getResidentialComplexParkingLots(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ParkingLotResponseDto[]> {
    return this.findParkingLotsByResidentialComplexUseCase.execute(id);
  }

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
      {
        status: HttpStatus.CONFLICT,
        description: 'Residential Complex already exists',
      },
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
  @UseGuards(AuthGuard(), UserTypeGuard)
  @RequiredUserTypes(userTypes.KIBUZ)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(false)
  @SetResponseMessageDecorator('Residential complex deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create residential complex',
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
}
