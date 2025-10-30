import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { User } from '../../../users/domain/entities/user.entity';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { UserDetail } from '../../domain/entities/user_detail.entity';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user_detail.repository-interface';
import { CreateUserDetailDto } from '../dtos/create-user-detail.dto';

@Injectable()
export class CreateUserDetailUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('UserDetailRepositoryInterface')
    private readonly userDetailRepository: UserDetailRepositoryInterface,
  ) {}

  async create(userData: CreateUserDetailDto): Promise<UserResponseDto> {
    const existingEmail = await this.userRepository.findUnique({
      conditions: { email: userData.email },
    });
    if (existingEmail) {
      if (!existingEmail.isActive)
        throw new DomainException(`User with email: ${userData.email} is inactive`);

      throw new DomainException(`User with email: ${userData.email} already exits`);
    }

    const user = new User({
      ...userData,
      isActive: true,
    });

    const userDetail = new UserDetail({
      ...userData,
    });

    await user.setPassword(userData.password);
    const userCreated = await this.userDetailRepository.create(user, userDetail);

    return userCreated;
  }
}
