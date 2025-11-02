import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { PaginationQueryDto } from '../../common/dtos/pagination-query.dto';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { UpdateUserDto } from '../application/dto/update-user.dto';
import { UserResponseDto } from '../application/dto/user-response.dto';
import { ActivateUserUseCase } from '../application/services/activate-user.use-case';
import { CreateUserUseCase } from '../application/services/create-user.use-case';
import { DeleteUserUseCase } from '../application/services/delete-user.use-case';
import { FindUsersUseCase } from '../application/services/find-users.use-case';
import { UpdateUserUseCase } from '../application/services/update-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly activateUserUseCase: ActivateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

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
    return this.findUsersUseCase.executeAll(paginationQueryDto);
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
    return this.createUserUseCase.create(createUserDto);
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

  @Patch('activateUser/:id')
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
