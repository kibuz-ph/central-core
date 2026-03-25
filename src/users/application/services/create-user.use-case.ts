import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { CreateUserDetailUseCase } from '../../../user-details/application/services/create-user-detail.use-case';
import { UserDetail } from '../../../user-details/domain/entities/user-detail.entity';
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

  async create(userData: CreateUserDto): Promise<User> {
    const existingEmail = await this.userRepository.findUnique({
      conditions: { email: userData.email },
    });

    if (existingEmail) {
      if (!existingEmail.isActive)
        throw new DomainException(`User with email: ${userData.email} is inactive`);

      throw new DomainException(`User with email: ${userData.email} already exits`);
    }

    if (!userData.password) throw new DomainException('Password is required');

    const user = new User({ ...userData, isActive: true });
    await user.setPassword(userData.password);

    const createdUser = await this.userRepository.create(user);

    await this.createUserDetailUseCase.create(
      new UserDetail({ ...userData, userId: createdUser.id as string }),
    );

    return createdUser;
  }
}
