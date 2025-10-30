import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Config } from '../../../../config/config';
import { DomainException } from '../../../../modules/pino/domain/exceptions/domain.exception';
import { UserRepositoryInterface } from '../../../../users/domain/repositories/user.repository-interface';
import { TokenPayloadDto } from '../../../application/dto/token-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    configService: ConfigService<Config>,
  ) {
    const secret = configService.get('accessTokenSecret', { infer: true });
    if (!secret) {
      throw new Error('JWT secret is not configured');
    }

    const strategyOptions: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    };

    super(strategyOptions);
  }

  async validate(payload: TokenPayloadDto) {
    const user = await this.userRepository.findByIdAuth(payload.id);
    if (!user) {
      throw new DomainException(`User with id: ${payload.id} doesn't exist`);
    }

    if (!user.isActive) {
      throw new DomainException({
        message: `User with id: ${payload.id} is inactive`,
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }
    return user.toJSON();
  }
}
