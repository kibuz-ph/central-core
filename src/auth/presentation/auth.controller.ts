import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../../common/decorators/make-me-public.decorator';
import { EndpointSwaggerDecorator } from '../../common/decorators/swagger.decorator';
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
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly checkAuthStatusUseCase: CheckAuthStatusUseCase,
  ) {}

  @Post('signup')
  @Public()
  @Throttle({ default: { limit: 2, ttl: 60 } }) // 2 requests per minute
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
  async registerUser(@Body() registerUSerData: SignupDto): Promise<AuthResponseDto> {
    return this.signupUseCase.execute(registerUSerData);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @EndpointSwaggerDecorator({
    summary: 'Login user and return token',
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
  ): AuthResponseDto {
    return this.signInUseCase.execute(req.user);
  }

  @Get('status')
  @UseGuards(AuthGuard())
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @HttpCode(HttpStatus.OK)
  checkAuthStatus(@Req() req: Request & { user: Omit<UserProps, 'password'> & { id: string } }) {
    return this.checkAuthStatusUseCase.execute(req.user);
  }
}
