import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import ms from 'ms';
import { Public } from '../../common/decorators/make-me-public.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
import { Config } from '../../config/config';
import { UserProps } from '../../users/domain/entities/user.entity';
import { AuthResponseDto } from '../application/dto/auth-response.dto';
import { SignInDto } from '../application/dto/signin.dto';
import { SignupDto } from '../application/dto/signup.dto';
import { CheckAuthStatusUseCase } from '../application/services/check-auth-status.use-case';
import { SignupUseCase } from '../application/services/signup.use-case';
import { SignInUseCase } from '../application/services/singin.use-case';
import { LocalAuthGuard } from '../infrastructure/security/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  private get cookieOptions() {
    return {
      httpOnly: true,
      secure: true,
      sameSite:
        this.configService.get<string>('nodeEnv') === 'local'
          ? ('none' as const)
          : ('strict' as const),
    };
  }

  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly checkAuthStatusUseCase: CheckAuthStatusUseCase,
    private readonly configService: ConfigService<Config>,
  ) {}

  @Post('signup')
  @Public()
  @Throttle({ default: { limit: 2, ttl: 60 } })
  @EndpointSwaggerDecorator({
    summary: 'Save user and send verification code',
    bodyType: SignupDto,
    responseType: AuthResponseDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.CONFLICT,
        description: 'Email already exists',
      },
    ],
    requireAuth: false,
  })
  async registerUser(
    @Body() registerUserData: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { user, token } = await this.signupUseCase.execute(registerUserData);
    this.setAccessTokenCookie(res, token);
    return { user, success: true };
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @EndpointSwaggerDecorator({
    summary: 'Login user',
    responseType: AuthResponseDto,
    bodyType: SignInDto,
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.CONFLICT,
        description: 'Credentials are not valid',
      },
    ],
    requireAuth: false,
  })
  @HttpCode(HttpStatus.OK)
  signIn(
    @Req() req: Request & { user: Omit<UserProps, 'password'> & { id: string } },
    @Res({ passthrough: true }) res: Response,
  ): AuthResponseDto {
    const { user, token } = this.signInUseCase.execute(req.user);
    this.setAccessTokenCookie(res, token);
    return { user, success: true };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @EndpointSwaggerDecorator({
    summary: 'Logout and clear session cookie',
    successStatus: HttpStatus.OK,
    requireAuth: true,
  })
  logout(@Res({ passthrough: true }) res: Response): { success: boolean } {
    res.clearCookie('accessToken', this.cookieOptions);
    return { success: true };
  }

  @Get('status')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  checkAuthStatus(
    @Req() req: Request & { user: Omit<UserProps, 'password'> & { id: string } },
    @Res({ passthrough: true }) res: Response,
  ): AuthResponseDto {
    const { user, token } = this.checkAuthStatusUseCase.execute(req.user);
    this.setAccessTokenCookie(res, token);
    return { user, success: true };
  }

  private setAccessTokenCookie(res: Response, token: string): void {
    const accessTokenExpiresIn = this.configService.get<string>('accessTokenExpiresIn') ?? '30m';
    res.cookie('accessToken', token, {
      ...this.cookieOptions,
      maxAge: ms(accessTokenExpiresIn as ms.StringValue),
    });
  }
}
