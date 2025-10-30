import { Controller, Delete, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { UpdateUserDetailDto } from '../../user-details/application/dtos/update-user-detail.dto';
import { UserResponseDto } from '../application/dto/user-response.dto';
import { DeleteUsersUseCase } from '../application/services/delete-users.use-case';
import { FindUsersUseCase } from '../application/services/find-users.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly deleteUsersUseCase: DeleteUsersUseCase,
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
  async getUsers(): Promise<UserResponseDto[]> {
    return this.findUsersUseCase.executeAll();
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

  @Delete(':id')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  // @WrapResponse(false)
  @SetResponseMessageDecorator('User deleted successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update user',
    // responseType: createBaseResponse('User deleted successfully'),
    bodyType: UpdateUserDetailDto,
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
    return this.deleteUsersUseCase.execute(id);
  }
}
