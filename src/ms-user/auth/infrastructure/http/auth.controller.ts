import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../../../../common/decorators/make-me-public.decorator';
import { EndpointSwaggerDecorator } from '../../../../common/decorators/swagger.decorator';
import { SignupUseCase } from '../../application/services/signup.use-case';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signupUseCase: SignupUseCase) {}

  @Post('signup')
  @Public()
  @Throttle({ default: { limit: 2, ttl: 60 } }) // 2 requests per minute
  @EndpointSwaggerDecorator({
    summary: 'Save user and send verification code',
    bodyType: SignupDto,
    responseType: undefined,
    successStatus: HttpStatus.OK,
    extraResponses: [
      {
        status: HttpStatus.CONFLICT,
        description: 'Email already exists',
      },
    ],
    requireAuth: false,
  })
  async registerUser(@Body() registerUSerData: SignupDto) {
    return this.signupUseCase.execute(registerUSerData);
  }
}
