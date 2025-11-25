import { UserProps } from '../../../users/domain/entities/user.entity';
import { SignInDto } from '../../application/dto/signin.dto';
import { TokenPayloadDto } from '../../application/dto/token-payload.dto';

export interface SecurityServiceInterface {
  validateUserByEmailPwd(siginDto: SignInDto): Promise<Omit<UserProps, 'password'> | null>;
  generateAccessToken(payload: TokenPayloadDto): string;
}
