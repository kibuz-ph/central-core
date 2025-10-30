import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { UserDetailRepositoryInterface } from '../../domain/repositories/user_detail.repository-interface';
import { UpdateUserDetailDto } from '../dtos/update-user-detail.dto';

@Injectable()
export class ActivateUserDetailUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('UserDetailRepositoryInterface')
    private readonly userDetailRepository: UserDetailRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const userExists = await this.userRepository.findUnique({
      conditions: { id },
    });

    if (!userExists) {
      throw new DomainException('User not found');
    }

    const user: UpdateUserDetailDto = {
      isActive: true,
    };

    console.log(user);

    const userDetail = await this.userDetailRepository.update(id, user);
    return userDetail ? true : false;
  }
}
