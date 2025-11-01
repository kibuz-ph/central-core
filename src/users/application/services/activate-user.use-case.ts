import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class ActivateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const userExists = await this.userRepository.findUnique({
      conditions: { id },
    });

    if (!userExists) {
      throw new DomainException('User not found');
    }

    const user: UpdateUserDto = {
      isActive: true,
    };

    const userDetail = await this.userRepository.update(id, user);
    return userDetail ? true : false;
  }
}
