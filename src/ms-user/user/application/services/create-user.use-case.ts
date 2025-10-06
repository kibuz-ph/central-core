import { Inject, Injectable } from '@nestjs/common';
import { User, UserProps } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async create(user: User): Promise<User> {
    const userCreated = await this.userRepository.create(new User(user as unknown as UserProps));
    return userCreated;
  }
}
