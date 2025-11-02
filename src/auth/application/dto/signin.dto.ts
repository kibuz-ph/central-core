import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { normalizeEmailTransform } from '../../../common/utils/email-normalization.util';

export class SignInDto {
  @ApiProperty({ example: 'jhon@gmail.com', description: 'User email' })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => normalizeEmailTransform(value))
  email: string;

  @ApiProperty({ example: 'SomeStrongP4ssword!', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
