import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepositoryInterface: UserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<boolean> {
    const userExists = await this.userRepositoryInterface.findUnique({
      conditions: { id, isActive: true },
    });

    if (!userExists) {
      throw new DomainException('User not found');
    }

    return this.userRepositoryInterface.delete(id);
  }
}
