import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../../../users/application/dto/user.dto';
import { UserProps } from '../../../users/domain/entities/user.entity';
import { SecurityServiceInterface } from '../../domain/repositories/security-service.repository-interface';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject('SecurityServiceInterface')
    private readonly securityService: SecurityServiceInterface,
  ) {}

  execute(user: Omit<UserProps, 'password'> & { id: string }): { user: UserDto; token: string } {
    const { id } = user;
    const token = this.securityService.generateAccessToken({ id });
    return { user, token };
  }
}
