import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { CreateUserDetailUseCase } from '../../../user-details/application/services/create-user-detail.use-case';
import { UserDetail } from '../../../user-details/domain/entities/user_detail.entity';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { User } from '../../../users/domain/entities/user.entity';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly createUserDetailUseCase: CreateUserDetailUseCase,
  ) {}

  async create(userData: CreateUserDto): Promise<UserResponseDto> {
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
    await user.setPassword(userData.password);
    const createUser = await this.userRepository.create(user);

    const userDetail = new UserDetail({
      ...userData,
      userId: createUser.id ?? '',
    });
    await this.createUserDetailUseCase.create(userDetail);

    const userCreated = { ...createUser, userDetail: undefined };

    return UserResponseDto.fromEntities(userCreated);
  }
}
