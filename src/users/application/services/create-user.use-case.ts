import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { User } from '../../../users/domain/entities/user.entity';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
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

    const user = new User({ ...userData, isActive: true });
    await user.setPassword(userData.password);

    return this.userRepository.create(user);
  }
}
