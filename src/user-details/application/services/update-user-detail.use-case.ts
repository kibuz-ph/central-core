import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user_detail.repository-interface';
import { UpdateUserDetailDto } from '../dtos/update-user-detail.dto';

@Injectable()
export class UpdateUserDetailUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('UserDetailRepositoryInterface')
    private readonly userDetailRepository: UserDetailRepositoryInterface,
  ) {}

  async execute(id: string, updateUserDetailDto: UpdateUserDetailDto): Promise<UserResponseDto> {
    const userExists = await this.userRepository.findUnique({
      conditions: { id },
    });

    if (!userExists) {
      throw new DomainException('User not found');
    }

    if (updateUserDetailDto.email) {
      const existingEmail = await this.userRepository.findUnique({
        conditions: { email: updateUserDetailDto.email },
      });
      if (existingEmail)
        throw new DomainException(`User with email: ${updateUserDetailDto.email} already exits`);
    }

    const userDetail = await this.userDetailRepository.update(id, updateUserDetailDto);
    return userDetail;
  }
}
