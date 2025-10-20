import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../../../../../config/config';
import { UserProps } from '../../../../user/domain/entities/user.entity';
import { UserRepositoryInterface } from '../../../../user/domain/repositories/user.repository-interface';
import { SignInDto } from '../../../application/dto/signin.dto';
import { SecurityServiceInterface } from '../../../domain/repositories/security-service.repository-interface';
import { TokenPayloadDto } from '../dto/token-payload.dto';

@Injectable()
export class SecurityServices implements SecurityServiceInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,

    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async validateUserByEmailPwd(signinDto: SignInDto): Promise<Omit<UserProps, 'password'> | null> {
    const user = await this.userRepository.findByEmail(signinDto.email);
    if (!user?.isActive) {
      return null;
    }
    const isValidPwd = await user?.validatePassword(signinDto.password);
    if (!user || !isValidPwd) {
      return null;
    }
    return user.toJSON();
  }

  generateAccessToken(payload: TokenPayloadDto): string {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('accessTokenExpiresIn', { infer: true }) ?? '30d',
    });
  }
}
