import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { CreateUserUseCase } from '../../../users/application/services/create-user.use-case';
import { SecurityServiceInterface } from '../../domain/repositories/security-service.repository-interface';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class SignupUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('SecurityServiceInterface')
    private readonly securityService: SecurityServiceInterface,
  ) {}

  async execute(singupDto: SignupDto): Promise<AuthResponseDto> {
    const userCreated = await this.createUserUseCase.create(singupDto);

    if (!userCreated.id) throw new DomainException('It does not contain a user Id and is required');

    const token = this.securityService.generateAccessToken({
      id: userCreated.id,
    });

    return {
      user: { ...userCreated },
      token,
      success: true,
    };
  }
}
