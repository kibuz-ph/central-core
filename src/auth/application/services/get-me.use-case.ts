import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  UserResponseDto,
  UserResponseProps,
} from '../../../users/application/dto/user-response.dto';
import { UserProps } from '../../../users/domain/entities/user.entity';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';

@Injectable()
export class GetMeUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(user: Omit<UserProps, 'password'> & { id: string }): Promise<UserResponseDto> {
    const foundUser = await this.userRepository.findUnique({ conditions: { id: user.id } });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return UserResponseDto.fromEntities(foundUser as UserResponseProps);
  }
}
