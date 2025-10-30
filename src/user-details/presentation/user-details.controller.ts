import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { SetResponseMessageDecorator } from '../../common/decorators/set-response-message.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { UserResponseDto } from '../../users/application/dto/user-response.dto';
import { CreateUserDetailDto } from '../application/dtos/create-user-detail.dto';
import { UpdateUserDetailDto } from '../application/dtos/update-user-detail.dto';
import { ActivateUserDetailUseCase } from '../application/services/activate-user-detail.use-case';
import { CreateUserDetailUseCase } from '../application/services/create-user-detail.use-case';
import { UpdateUserDetailUseCase } from '../application/services/update-user-detail.use-case';

@Controller('user-details')
export class UserDetailsController {
  constructor(
    private readonly createUserDetailUseCase: CreateUserDetailUseCase,
    private readonly updateUserDetailUseCase: UpdateUserDetailUseCase,
    private readonly activateUserDetailUseCase: ActivateUserDetailUseCase,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 2, ttl: 60 } })
  @HttpCode(HttpStatus.CREATED)
  // @WrapResponse(false)
  @SetResponseMessageDecorator('User detail created successfully')
  @EndpointSwaggerDecorator({
    summary: 'Create user detail',
    // responseType: createBaseResponse('User detail created successfully'),
    bodyType: CreateUserDetailDto,
    successStatus: HttpStatus.CREATED,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'User detail not found',
      },
      {
        status: HttpStatus.CONFLICT,
        description: 'User detail already exists',
      },
    ],
    requireAuth: true,
  })
  async createUser(@Body() createUserDetailDto: CreateUserDetailDto): Promise<UserResponseDto> {
    return this.createUserDetailUseCase.create(createUserDetailDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  // @WrapResponse(false)
  @SetResponseMessageDecorator('User detail updated successfully')
  @EndpointSwaggerDecorator({
    summary: 'Update a user detail',
    // responseType: createBaseResponse('User detail updated successfully'),
    bodyType: UpdateUserDetailDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.BAD_REQUEST,
        description: 'User detail not found',
      },
      {
        status: HttpStatus.CONFLICT,
        description: 'User detail already exists',
      },
    ],
    requireAuth: true,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ): Promise<UserResponseDto> {
    return this.updateUserDetailUseCase.execute(id, updateUserDetailDto);
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
    bodyType: UpdateUserDetailDto,
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
    return this.activateUserDetailUseCase.execute(id);
  }
}
