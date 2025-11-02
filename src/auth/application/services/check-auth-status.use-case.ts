import { Inject, Injectable } from '@nestjs/common';
import { UserProps } from '../../../users/domain/entities/user.entity';
import { SecurityServiceInterface } from '../../domain/repositories/security-service.repository-interface';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class CheckAuthStatusUseCase {
  constructor(
    @Inject('SecurityServiceInterface')
    private readonly securityService: SecurityServiceInterface,
  ) {}

  execute(user: Omit<UserProps, 'password'> & { id: string }): AuthResponseDto {
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
