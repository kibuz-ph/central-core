import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDetailUseCase } from '../../../user-details/application/services/create-user-detail.use-case';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { SecurityServiceInterface } from '../../domain/repositories/security-service.repository-interface';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly createUserDetailUseCase: CreateUserDetailUseCase,
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('SecurityServiceInterface')
    private readonly securityService: SecurityServiceInterface,
  ) {}

  async execute(singupDto: SignupDto): Promise<AuthResponseDto> {
    const userCreated = await this.createUserDetailUseCase.create(singupDto);

    const token = this.securityService.generateAccessToken({
      id: userCreated.id || '',
    });

    return {
      user: { ...userCreated },
      token,
      success: true,
    };
  }
}
