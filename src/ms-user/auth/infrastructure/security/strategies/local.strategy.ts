import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { DomainException } from '../../../../../modules/pino/domain/exceptions/domain.exception';
import { SecurityServiceInterface } from '../../../domain/repositories/security-service.repository-interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('SecurityServiceInterface')
    private readonly securityService: SecurityServiceInterface,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.securityService.validateUserByEmailPwd({ email, password });
    if (!user) {
      throw new DomainException('Invalid credentials');
    }
    return user;
  }
}
