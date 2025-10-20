import { Inject, Injectable } from '@nestjs/common';
import { UserProps } from '../../../user/domain/entities/user.entity';
import { SecurityServiceInterface } from '../../domain/repositories/security-service.repository-interface';
import { SignInResponseDto } from '../dto/signin-response.dto';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject('SecurityServiceInterface')
    private readonly securityService: SecurityServiceInterface,
  ) {}

  execute(user: Omit<UserProps, 'password'> & { id: string }): SignInResponseDto {
    const { id } = user;
    const token = this.securityService.generateAccessToken({
      id,
    });
    return {
      user,
      token,
      success: true,
    };
  }
}
