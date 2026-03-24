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
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { WrapResponse } from '../../common/decorators/wrap-response.decorator';
import { createDataResponse } from '../../common/dtos/base-response.dto';
import { PaginationQueryDto } from '../../common/dtos/pagination-query.dto';
import { ResponseWrapperInterceptor } from '../../common/interceptors/response-wrapper.interceptor';
import { UserRoleResponseDto } from '../../user-role/application/dto/user-role-response.dto';
import { FindUserRolesByComplexUseCase } from '../../user-role/application/services/find-user-roles-by-complex.use-case';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { UserResponseDto } from '../application/dto/user-response.dto';
import { ActivateUserUseCase } from '../application/services/activate-user.use-case';
import { DeleteUserUseCase } from '../application/services/delete-user.use-case';
import { FindUsersUseCase } from '../application/services/find-users.use-case';
import { RegisterUserUseCase } from '../application/services/register-user.use-case';
import { UpdateUserUseCase } from '../application/services/update-user.use-case';
import { UserProps } from '../domain/entities/user.entity';

@Controller('users')
@UseInterceptors(ResponseWrapperInterceptor)
export class UsersController {
  constructor(
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly activateUserUseCase: ActivateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly findUserRolesByComplexUseCase: FindUserRolesByComplexUseCase,
  ) {}

  @Get('me/roles/residential-complex/:residentialComplexId')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  @WrapResponse(true)
  @SetResponseMessageDecorator('User roles retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: 'Get authenticated user roles in a residential complex',
    responseType: createDataResponse(UserRoleResponseDto, 'User roles retrieved successfully'),
    successStatus: HttpStatus.OK,
    extraResponses: [
      { status: HttpStatus.BAD_REQUEST, description: 'Residential complex not found' },
    ],
    requireAuth: true,
  })
  async getUserRolesByComplex(
    @Req() req: Request & { user: Omit<UserProps, 'password'> & { id: string } },
    @Param('residentialComplexId', new ParseUUIDPipe()) residentialComplexId: string,
  ): Promise<UserRoleResponseDto[]> {
    return this.findUserRolesByComplexUseCase.execute(req.user.id, residentialComplexId);
  }

  @Get()
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  // @WrapResponse(true)
  @SetResponseMessageDecorator('Users retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: 'Get users',
    // responseType: createDataResponse(
    //     UserResponseDto,
    //     'Users retrieved successfully',
    // ),
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'Users not found',
      },
    ],
    requireAuth: true,
  })
  async getUsers(@Query() paginationQueryDto: PaginationQueryDto): Promise<UserResponseDto[]> {
    return this.findUsersUseCase.executeMany(paginationQueryDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  // @WrapResponse(true)
  @SetResponseMessageDecorator('User retrieved successfully')
  @EndpointSwaggerDecorator({
    summary: 'Get user by id',
    // responseType: createDataResponse(
    //     UserResponseDto,
    //     'User retrieved successfully',
    // ),
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'User not found',
      },
    ],
    requireAuth: true,
  })
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    return this.findUsersUseCase.executeById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 2, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  // @WrapResponse(false)
  @SetResponseMessageDecorator('User created successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create user detail',
    // responseType: createBaseResponse('User created successfully'),
    bodyType: CreateUserDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      {
        status: HttpStatus.CONFLICT,
        description: 'User already exists',
      },
    ],
    requireAuth: true,
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.registerUserUseCase.register(createUserDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  // @WrapResponse(false)
  @SetResponseMessageDecorator('User updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a user',
    // responseType: createBaseResponse('User updated successfully'),
    bodyType: UpdateUserDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'User not found',
      },
      {
        status: HttpStatus.CONFLICT,
        description: 'User already exists',
      },
    ],
    requireAuth: true,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateUserUseCase.update(id, updateUserDto);
  }

  @Patch('activate-user/:id')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  // @WrapResponse(false)
  @SetResponseMessageDecorator('User activated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Activate a user',
    // responseType: createBaseResponse('User activated successfully'),
    bodyType: UpdateUserDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'User not found',
      },
    ],
    requireAuth: true,
  })
  async activateUser(@Param('id') id: string): Promise<boolean> {
    return this.activateUserUseCase.execute(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  // @WrapResponse(false)
  @SetResponseMessageDecorator('User deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update user',
    // responseType: createBaseResponse('User deleted successfully'),
    bodyType: UpdateUserDto,
    successStatus: HttpStatus.NO_CONTENT,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'User not found',
      },
    ],
    requireAuth: true,
  })
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.deleteUserUseCase.execute(id);
  }
}
