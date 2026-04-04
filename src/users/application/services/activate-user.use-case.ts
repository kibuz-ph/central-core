import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';

@Injectable()
export class ActivateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const userExists = await this.userRepository.findUnique({
      conditions: { id, isActive: false },
    });

    if (!userExists) {
      throw new DomainException('User not found');
    }

    const user = new User({
      username: userExists.username,
      email: userExists.email,
      type: userExists.type,
      isActive: true,
    });

    const updated = await this.userRepository.update(id, user);
    return !!updated;
  }
}
