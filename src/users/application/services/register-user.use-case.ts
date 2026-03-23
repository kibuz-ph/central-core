import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { CreateUserUseCase } from './create-user.use-case';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async register(userData: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = await this.createUserUseCase.create(userData);
    return UserResponseDto.fromEntities({ ...createdUser, userDetail: undefined });
  }
}
